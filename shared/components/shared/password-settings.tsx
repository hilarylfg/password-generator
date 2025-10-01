import React, { useState } from 'react'

import { CheckboxGroup } from '@/shared/components/shared'
import {
	type CheckboxOptionKey,
	type CheckboxValues
} from '@/shared/components/shared/checkbox.types'

const initialValues: CheckboxValues = {
	uppercase: true,
	lowercase: true,
	numbers: true,
	special: true,
	no_similar: false,
	spaces: false
}

export default function PasswordSettings() {
	const [options, setOptions] = useState<CheckboxValues>(initialValues)

	function handleChange(key: CheckboxOptionKey, checked: boolean) {
		setOptions(opts => ({
			...opts,
			[key]: checked
		}))
	}

	return <CheckboxGroup values={options} onChange={handleChange} />
}
