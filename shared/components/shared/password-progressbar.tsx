import { Progress } from '@/shared/components'
import { cn } from '@/shared/utils'

export function PasswordProgressbar({
	value,
	strengthClass,
	strength
}: {
	value: number
	strengthClass: string
	strength: string
}) {
	return (
		<div>
			<Progress className={strengthClass} value={value} />
			<p className={cn(value !== 0 && strengthClass, 'progressbar-text')}>
				{value !== 0 ? strength : 'Сгенерируйте пароль'}
			</p>
		</div>
	)
}
