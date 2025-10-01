'use client'

import { Button, ButtonCopy } from '@/shared/components'

interface Props {
	onCopy: () => void
	onGenerate: () => void
}

export function ButtonsGroup({ onCopy, onGenerate }: Props) {
	return (
		<div className='buttons-group'>
			<Button onClick={onGenerate}>Сгенерировать</Button>
			<ButtonCopy onClick={onCopy} />
		</div>
	)
}
