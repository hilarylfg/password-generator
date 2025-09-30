'use client'

import { Button, ButtonCopy } from '@/shared/components'

interface Props {
	onClick: () => void
}

export function ButtonsGroup({ onClick }: Props) {
	return (
		<div className='buttons-group'>
			<Button>Сгенерировать</Button>
			<ButtonCopy onClick={onClick} />
		</div>
	)
}
