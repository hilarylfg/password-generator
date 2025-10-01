'use client'

import { ChangeEvent } from 'react'

import { DecryptedText } from '@/shared/components'

interface Props {
	value: string
}

export function PasswordInput({ value }: Props) {
	return (
		<DecryptedText text={value} animateOn='view' revealDirection='center' />
	)
}
