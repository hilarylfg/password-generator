import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import type { CheckboxValues } from '@/shared/types'

const CHAR_SETS = {
	LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	NUMBERS: '0123456789',
	SPECIAL: '!@#$%^&*()_+-=[]{}|;:,.<>?',
	SPACE: ' '
}

function cryptoRandomInt(max: number): number {
	if (max <= 0) {
		throw new Error('Максимальное значение должно быть больше 0')
	}
	const array = new Uint32Array(1)
	const limit = 0x100000000 - (0x100000000 % max)
	let value
	do {
		crypto.getRandomValues(array)
		value = array[0]
	} while (value >= limit)
	return value % max
}

function pickRandomChar(chars: string): string {
	if (!chars) {
		return ''
	}
	return chars[cryptoRandomInt(chars.length)]
}

function shuffleInPlace<T>(arr: T[]): void {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = cryptoRandomInt(i + 1)
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
}

interface UsePasswordGeneratorReturn {
	password: string
	error: string | null
	generatePassword: (options: CheckboxValues) => void
	isGenerating: boolean
}

export const usePasswordGenerator = (): UsePasswordGeneratorReturn => {
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isGenerating, setIsGenerating] = useState(false)

	const generatePassword = useCallback((options: CheckboxValues) => {
		setIsGenerating(true)
		setError(null)

		try {
			const { length, no_similar } = options

			const enabledCategories = [
				options.lowercase && { chars: CHAR_SETS.LOWERCASE },
				options.uppercase && { chars: CHAR_SETS.UPPERCASE },
				options.numbers && { chars: CHAR_SETS.NUMBERS },
				options.special && { chars: CHAR_SETS.SPECIAL },
				options.spaces && { chars: CHAR_SETS.SPACE }
			].filter(Boolean) as { chars: string }[]

			const characterPool = enabledCategories.map(c => c.chars).join('')
			const uniqueChars = [...new Set(characterPool)]

			if (enabledCategories.length === 0) {
				throw new Error('Выберите хотя бы один тип символов.')
			}
			if (length < enabledCategories.length) {
				throw new Error(
					`Длина пароля (${length}) слишком мала для выбранных категорий.`
				)
			}
			if (no_similar && length > uniqueChars.length) {
				throw new Error(
					`Недостаточно уникальных символов для длины ${length}.`
				)
			}

			const passwordChars: string[] = []
			const usedChars = new Set<string>()

			for (const category of enabledCategories) {
				let char: string
				if (no_similar) {
					const available = [...new Set(category.chars)].filter(
						c => !usedChars.has(c)
					)
					if (available.length === 0) {
						throw new Error(
							'Не удалось подобрать уникальные символы. Измените настройки.'
						)
					}
					char = pickRandomChar(available.join(''))
					usedChars.add(char)
				} else {
					char = pickRandomChar(category.chars)
				}
				passwordChars.push(char)
			}

			const remainingLength = length - passwordChars.length
			if (remainingLength > 0) {
				if (no_similar) {
					const remainingPool = uniqueChars.filter(
						char => !usedChars.has(char)
					)
					shuffleInPlace(remainingPool)
					passwordChars.push(
						...remainingPool.slice(0, remainingLength)
					)
				} else {
					for (let i = 0; i < remainingLength; i++) {
						passwordChars.push(pickRandomChar(characterPool))
					}
				}
			}

			shuffleInPlace(passwordChars)
			setPassword(passwordChars.join(''))
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: 'Произошла неизвестная ошибка'
			setError(message)
			setPassword('')
			toast.error(message, {
				duration: 3000,
				position: 'bottom-right'
			})
		} finally {
			setIsGenerating(false)
		}
	}, [])

	return { password, error, generatePassword, isGenerating }
}
