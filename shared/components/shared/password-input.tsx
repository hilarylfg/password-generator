import { DecryptedText } from '@/shared/components'

interface Props {
	value: string
}

export function PasswordInput({ value }: Props) {
	return (
		<div className='password-input__wrapper'>
			<DecryptedText
				className='password-input'
				text={value}
				animateOn='view'
				revealDirection='center'
			/>
		</div>
	)
}
