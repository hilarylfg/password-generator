import { useCallback, useState } from 'react'

import { CheckboxValues } from '@/shared/types'

interface UsePasswordGeneratorReturn {
	password: string
	error: string | null
	generatePassword: (options: CheckboxValues, length?: number) => void
	isGenerating: boolean
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SPACE = ' '

const DEFAULT_LENGTH = 16

function cryptoRandomInt(max: number): number {
	if (max <= 0) throw new Error('Invalid max for random int')
	const array = new Uint32Array(1)
	const limit = Math.floor(0x100000000 / max) * max
	let value: number
	do {
		crypto.getRandomValues(array)
		value = array[0]
	} while (value >= limit)
	return value % max
}

function pickRandomChar(chars: string): string {
	return chars[cryptoRandomInt(chars.length)]
}

function shuffleInPlace<T>(arr: T[]): void {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = cryptoRandomInt(i + 1)
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
}

export const usePasswordGenerator = (): UsePasswordGeneratorReturn => {
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [isGenerating, setIsGenerating] = useState<boolean>(false)

	const generatePassword = useCallback(
		(options: CheckboxValues, length: number = DEFAULT_LENGTH) => {
			setIsGenerating(true)
			setError(null)

			try {
				const {
					uppercase,
					lowercase,
					numbers,
					special,
					spaces,
					no_similar
				} = options

				const categories: Array<{ enabled: boolean; chars: string }> = [
					{ enabled: lowercase, chars: LOWERCASE },
					{ enabled: uppercase, chars: UPPERCASE },
					{ enabled: numbers, chars: NUMBERS },
					{ enabled: special, chars: SPECIAL_CHARS },
					{ enabled: spaces, chars: SPACE }
				]

				const enabledCategories = categories.filter(c => c.enabled)
				if (enabledCategories.length === 0) {
					throw new Error('Выберите хотя бы один тип символов')
				}

				let pool = ''
				for (const c of enabledCategories) pool += c.chars

				const uniquePoolSet = Array.from(new Set(pool.split('')))
				const uniquePool = uniquePoolSet.join('')

				if (no_similar && length > uniquePool.length) {
					throw new Error(
						`Недостаточно уникальных символов для длины ${length}. Уменьшите длину или включите больше категорий.`
					)
				}

				if (length < enabledCategories.length) {
					throw new Error(
						`Длина пароля (${length}) меньше числа выбранных категорий (${enabledCategories.length}). Увеличьте длину.`
					)
				}

				const result: string[] = []
				const used = new Set<string>()

				for (const cat of enabledCategories) {
					let char = pickRandomChar(cat.chars)
					if (no_similar) {
						let attempts = 0
						const maxAttempts = 256
						while (used.has(char)) {
							char = pickRandomChar(cat.chars)
							attempts++
							if (attempts > maxAttempts) {
								throw new Error(
									'Не удалось подобрать уникальные символы из выбранных категорий. Измените настройки.'
								)
							}
						}
						used.add(char)
					}
					result.push(char)
				}

				if (no_similar) {
					const available = uniquePoolSet.filter(ch => !used.has(ch))
					shuffleInPlace(available)
					const need = length - result.length
					if (available.length < need) {
						throw new Error(
							'Недостаточно уникальных символов для генерации пароля. Уменьшите длину или включите больше категорий.'
						)
					}
					result.push(...available.slice(0, need))
				} else {
					const need = length - result.length
					for (let i = 0; i < need; i++) {
						result.push(pickRandomChar(uniquePool))
					}
				}

				shuffleInPlace(result)

				setPassword(result.join(''))
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Произошла ошибка'
				)
				setPassword('')
			} finally {
				setIsGenerating(false)
			}
		},
		[]
	)

	return {
		password,
		error,
		generatePassword,
		isGenerating
	}
}
