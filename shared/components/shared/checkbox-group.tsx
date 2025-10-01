import cn from 'clsx'

import { Checkbox } from '@/shared/components'
import type {
	CheckboxOptionKey,
	CheckboxValues
} from '@/shared/components/shared/types'

const options = [
	{ label: 'Заглавные буквы (A-Z)', value: 'uppercase' },
	{ label: 'Строчные буквы (a-z)', value: 'lowercase' },
	{ label: 'Цифры (0-9)', value: 'numbers' },
	{ label: 'Специальные символы (!@#$%)', value: 'special' },
	{ label: 'Без похожих символов (Il1Lo0O)', value: 'no_similar' },
	{ label: 'Вставлять пробелы ( )', value: 'spaces' }
] as const

interface CheckboxGroupProps {
	values: CheckboxValues
	onChange: (key: CheckboxOptionKey, checked: boolean) => void
}

export function CheckboxGroup({ values, onChange }: CheckboxGroupProps) {
	return (
		<div className='checkbox-group-ui'>
			{options.map(opt => (
				<label
					key={opt.value}
					className={cn('checkbox-group-ui__item', {
						'checkbox-group-ui__item--checked': values[opt.value]
					})}
				>
					<Checkbox
						checked={values[opt.value]}
						onCheckedChange={checked =>
							onChange(opt.value, checked as boolean)
						}
					/>
					<span className='checkbox-group-ui__label'>
						{opt.label}
					</span>
				</label>
			))}
		</div>
	)
}
