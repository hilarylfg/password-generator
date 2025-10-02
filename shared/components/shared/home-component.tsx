'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
	ButtonsGroup,
	CheckboxGroup,
	HomeTitle,
	PasswordInput,
	PasswordProgressbar,
	RangePasswordSlider
} from '@/shared/components'
import {
	useCopyToClipboard,
	usePasswordGenerator,
	usePasswordStrength
} from '@/shared/hooks'
import type { CheckboxOptionKey, CheckboxValues } from '@/shared/types'

const initialCheckboxValues: CheckboxValues = {
	uppercase: true,
	lowercase: true,
	numbers: true,
	special: false,
	no_similar: false,
	spaces: false,
	length: 16
}

export function HomeComponent() {
	const { inputValue, setInputValue, copyToClipboard } = useCopyToClipboard()
	const [checkboxOptions, setCheckboxOptions] = useState<CheckboxValues>(
		initialCheckboxValues
	)
	const { password, generatePassword } = usePasswordGenerator()
	const { progressValue, strengthClass, strength } =
		usePasswordStrength(password)

	useEffect(() => {
		setInputValue(password)
	}, [password, setInputValue])

	const handleCheckboxChange = useCallback(
		(key: CheckboxOptionKey, checked: boolean) => {
			setCheckboxOptions(prevOptions => ({
				...prevOptions,
				[key]: checked
			}))
		},
		[]
	)

	const handleLengthChange = useCallback((newLength: number) => {
		setCheckboxOptions(prevOptions => ({
			...prevOptions,
			length: newLength
		}))
	}, [])

	const handleGenerate = useCallback(() => {
		generatePassword(checkboxOptions)
		toast.success('Пароль успешно сгенерирован', {
			duration: 3000
		})
	}, [generatePassword, checkboxOptions])

	const handleCopy = useCallback(() => {
		if (!inputValue) return

		void copyToClipboard(inputValue)
		toast.success('Пароль успешно скопирован', {
			duration: 3000
		})
	}, [copyToClipboard, inputValue])

	return (
		<div className='home-page'>
			<HomeTitle />
			<CheckboxGroup
				values={checkboxOptions}
				onChange={handleCheckboxChange}
			/>
			<RangePasswordSlider
				length={checkboxOptions.length}
				onChange={handleLengthChange}
			/>
			<PasswordInput value={inputValue} />
			<div className='home-page__footer'>
				<PasswordProgressbar
					value={progressValue}
					strengthClass={strengthClass}
					strength={strength}
				/>
				<ButtonsGroup onCopy={handleCopy} onGenerate={handleGenerate} />
			</div>
		</div>
	)
}
