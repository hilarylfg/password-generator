'use client'

import { Button } from '@/shared/components'

interface Props {
	onCopy: () => void
	onGenerate: () => void
}

export function ButtonsGroup({ onCopy, onGenerate }: Props) {
	return (
		<div className='buttons-group'>
			<Button onClick={onGenerate}>Сгенерировать</Button>
			<Button onClick={onCopy}>Копировать</Button>
		</div>
	)
}
