'use client'

import { useState } from 'react'

import {
	ButtonsGroup,
	CheckboxGroup,
	HomeTitle,
	PasswordInput,
	PasswordProgressbar
} from '@/shared/components'
import type {
	CheckboxOptionKey,
	CheckboxValues
} from '@/shared/components/shared/checkbox.types'
import { useCopyToClipboard } from '@/shared/hooks'

const initialCheckboxValues: CheckboxValues = {
	uppercase: true,
	lowercase: true,
	numbers: true,
	special: true,
	no_similar: false,
	spaces: false
}

export function HomeComponent() {
	const { inputValue, handleInputChange, copyToClipboard } =
		useCopyToClipboard()

	const [checkboxOptions, setCheckboxOptions] = useState<CheckboxValues>(
		initialCheckboxValues
	)

	function handleCheckboxChange(key: CheckboxOptionKey, checked: boolean) {
		setCheckboxOptions((opts: CheckboxValues) => ({
			...opts,
			[key]: checked
		}))
	}

	return (
		<div className='home-page'>
			<HomeTitle />
			<CheckboxGroup
				values={checkboxOptions}
				onChange={handleCheckboxChange}
			/>
			<PasswordProgressbar />
			<PasswordInput value={inputValue} onChange={handleInputChange} />
			<ButtonsGroup onClick={() => copyToClipboard(inputValue)} />
		</div>
	)
}
