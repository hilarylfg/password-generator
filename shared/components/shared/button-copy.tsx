import { Button } from '@/shared/components'

interface Props {
	onClick: () => void
}

export function ButtonCopy({ onClick }: Props) {
	return (
		<>
			<Button className='button-copy' onClick={onClick}>
				Копировать
			</Button>
		</>
	)
}
