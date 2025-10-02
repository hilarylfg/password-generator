export type CheckboxOptionKey =
	| 'uppercase'
	| 'lowercase'
	| 'numbers'
	| 'special'
	| 'no_similar'
	| 'spaces'

export interface CheckboxValues {
	uppercase: boolean
	lowercase: boolean
	numbers: boolean
	special: boolean
	no_similar: boolean
	spaces: boolean
	length: number
}
