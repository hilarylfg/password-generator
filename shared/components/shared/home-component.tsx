import {
	ButtonsGroup,
	CheckboxGroup,
	HomeTitle,
	PasswordInput,
	PasswordProgressbar
} from '@/shared/components'

export function HomeComponent() {
	return (
		<div className='home-page'>
			<HomeTitle />
			<CheckboxGroup />
			<PasswordProgressbar />
			<PasswordInput />
			<ButtonsGroup />
		</div>
	)
}
