import { useCallback, useState } from 'react'

import { CheckboxValues } from '@/shared/types'

interface UsePasswordGeneratorReturn {
	password: string
	error: string | null
	generatePassword: (options: CheckboxValues) => void
	isGenerating: boolean
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SPACE = ' '

const LENGHT = 16

export const usePasswordGenerator = (): UsePasswordGeneratorReturn => {
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [isGenerating, setIsGenerating] = useState<boolean>(false)

	const generatePassword = useCallback((options: CheckboxValues) => {
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

			let characters = ''
			if (uppercase) characters += LOWERCASE
			if (lowercase) characters += UPPERCASE
			if (special) characters += SPECIAL_CHARS
			if (numbers) characters += NUMBERS
			if (spaces) characters += SPACE

			if (characters.length === 0) {
				throw new Error('Выберите хотя бы один тип символов')
			}

			let generatedPassword = ''
			const maxAttempts = LENGHT * 10
			let attempts = 0

			for (let i = 0; i < LENGHT; i++) {
				let char: string

				if (no_similar) {
					do {
						char = characters.charAt(
							Math.floor(Math.random() * characters.length)
						)
						attempts++

						if (attempts > maxAttempts) {
							throw new Error(
								'Не удалось сгенерировать пароль без повторений. Попробуйте увеличить длину или изменить настройки.'
							)
						}
					} while (
						generatedPassword.length > 0 &&
						char === generatedPassword[generatedPassword.length - 1]
					)
				} else {
					char = characters.charAt(
						Math.floor(Math.random() * characters.length)
					)
				}

				generatedPassword += char
			}

			setPassword(generatedPassword)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка')
			setPassword('')
		} finally {
			setIsGenerating(false)
		}
	}, [])

	return {
		password,
		error,
		generatePassword,
		isGenerating
	}
}
