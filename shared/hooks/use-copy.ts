'use client'

import { ChangeEvent, useCallback, useState } from 'react'

export const useCopyToClipboard = (initialValue = '') => {
	const [inputValue, setInputValue] = useState(initialValue)

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value
			setInputValue(newValue)
		},
		[]
	)

	const copyToClipboard = useCallback(
		async (text?: string) => {
			const valueToCopy = text !== undefined ? text : inputValue

			try {
				await navigator.clipboard.writeText(valueToCopy)
				console.log('Текст скопирован в буфер обмена:', valueToCopy)
				return true
			} catch (err) {
				console.error('Ошибка при копировании:', err)
				return false
			}
		},
		[inputValue]
	)

	return {
		inputValue,
		setInputValue,
		handleInputChange,
		copyToClipboard
	}
}
