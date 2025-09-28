import * as React from 'react'

import { cn } from '@/shared/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn('input', className)}
			{...props}
		/>
	)
}

export { Input }
