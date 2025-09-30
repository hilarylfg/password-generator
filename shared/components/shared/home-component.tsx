'use client'

import {
	ButtonsGroup,
	CheckboxGroup,
	HomeTitle,
	PasswordInput,
	PasswordProgressbar
} from '@/shared/components'
import { useCopyToClipboard } from '@/shared/hooks'

export function HomeComponent() {
	const { inputValue, handleInputChange, copyToClipboard } =
		useCopyToClipboard()

	return (
		<div className='home-page'>
			<HomeTitle />
			<CheckboxGroup />
			<PasswordProgressbar />
			<PasswordInput value={inputValue} onChange={handleInputChange} />
			<ButtonsGroup onClick={() => copyToClipboard(inputValue)} />
		</div>
	)
}
