'use client'

import { ChangeEvent } from 'react'

import { Input } from '@/shared/components'

interface Props {
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInput({ value, onChange }: Props) {
	return (
		<Input
			className='password-input'
			value={value}
			onChange={onChange}
			placeholder='Сгенерированный пароль'
		/>
	)
}
