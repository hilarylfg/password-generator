export type CheckboxOptionKey =
	| 'uppercase'
	| 'lowercase'
	| 'numbers'
	| 'special'
	| 'no_similar'
	| 'spaces'

export type CheckboxValues = Record<CheckboxOptionKey, boolean>
