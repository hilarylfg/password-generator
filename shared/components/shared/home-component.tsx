'use client'

import { useEffect, useState } from 'react'

import {
	ButtonsGroup,
	CheckboxGroup,
	HomeTitle,
	PasswordInput,
	PasswordProgressbar,
	RangePasswordSlider
} from '@/shared/components'
import { useCopyToClipboard } from '@/shared/hooks'
import { usePasswordGenerator } from '@/shared/hooks/use-password-generator'
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

	function handleCheckboxChange(key: CheckboxOptionKey, checked: boolean) {
		setCheckboxOptions((opts: CheckboxValues) => ({
			...opts,
			[key]: checked
		}))
	}

	const { password, generatePassword } = usePasswordGenerator()

	useEffect(() => {
		setInputValue(password)
	}, [password, setInputValue])

	return (
		<div className='home-page'>
			<HomeTitle />
			<CheckboxGroup
				values={checkboxOptions}
				onChange={handleCheckboxChange}
			/>
			<RangePasswordSlider
				length={checkboxOptions.length}
				onChange={(newLength: number) =>
					setCheckboxOptions({
						...checkboxOptions,
						length: newLength
					})
				}
			/>
			<PasswordInput value={inputValue} />
			<PasswordProgressbar />
			<ButtonsGroup
				onCopy={() => copyToClipboard(inputValue)}
				onGenerate={() => generatePassword(checkboxOptions)}
			/>
		</div>
	)
}
