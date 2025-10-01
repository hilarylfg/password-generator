import React from 'react'

import { Checkbox } from '@/shared/components'
import type {
	CheckboxOptionKey,
	CheckboxValues
} from '@/shared/components/shared/checkbox.types'

const options = [
	{ label: 'Заглавные буквы (A-Z)', value: 'uppercase' },
	{ label: 'Строчные буквы (a-z)', value: 'lowercase' },
	{ label: 'Цифры (0-9)', value: 'numbers' },
	{ label: 'Специальные символы (!@#$%)', value: 'special' },
	{ label: 'Без похожих символов (Il1Lo0O)', value: 'no_similar' },
	{ label: 'Вставлять пробелы ( )', value: 'spaces' }
] as const

interface CheckboxGroupProps {
	values?: CheckboxValues
	onChange: (key: CheckboxOptionKey, checked: boolean) => void
}

const defaultValues: CheckboxValues = {
	uppercase: false,
	lowercase: false,
	numbers: false,
	special: false,
	no_similar: false,
	spaces: false
}

export function CheckboxGroup({
	values = defaultValues,
	onChange
}: CheckboxGroupProps) {
	return (
		<div className='checkbox-group-ui'>
			{options.map(opt => (
				<label key={opt.value} className='checkbox-group-ui__item'>
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
