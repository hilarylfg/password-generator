import { useMemo } from 'react'

interface PasswordStrengthResult {
	length: number
	hasLower: boolean
	hasUpper: boolean
	hasDigit: boolean
	hasSpecial: boolean
	hasSpace: boolean
	score: number
	strength: string
	progressValue: number
	strengthClass: string
}

const MAX_SCORE = 9

const getStrengthProps = (score: number) => {
	if (score <= 2) {
		return {
			strength: 'Очень слабый',
			strengthClass: 'strength-very-weak'
		}
	}
	if (score <= 4) {
		return { strength: 'Слабый', strengthClass: 'strength-weak' }
	}
	if (score <= 6) {
		return { strength: 'Средний', strengthClass: 'strength-medium' }
	}
	if (score <= 8) {
		return { strength: 'Сильный', strengthClass: 'strength-strong' }
	}
	return {
		strength: 'Очень сильный',
		strengthClass: 'strength-very-strong'
	}
}

export const usePasswordStrength = (
	password: string
): PasswordStrengthResult => {
	return useMemo(() => {
		const length = password.length

		if (length === 0) {
			return {
				length: 0,
				hasLower: false,
				hasUpper: false,
				hasDigit: false,
				hasSpecial: false,
				hasSpace: false,
				score: 0,
				strength: '',
				progressValue: 0,
				strengthClass: ''
			}
		}

		const hasLower = /[a-z]/.test(password)
		const hasUpper = /[A-Z]/.test(password)
		const hasDigit = /\d/.test(password)
		const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
		const hasSpace = password.includes(' ')

		let score = 0

		if (length >= 8) score += 1
		if (length >= 12) score += 1
		if (length >= 16) score += 1
		if (length >= 20) score += 1

		if (hasLower) score += 1
		if (hasUpper) score += 1
		if (hasDigit) score += 1
		if (hasSpecial) score += 1
		if (hasSpace) score += 1

		const { strength, strengthClass } = getStrengthProps(score)
		const progressValue = (score / MAX_SCORE) * 100

		return {
			length,
			hasLower,
			hasUpper,
			hasDigit,
			hasSpecial,
			hasSpace,
			score,
			strength,
			progressValue,
			strengthClass
		}
	}, [password])
}
