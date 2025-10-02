import { RangeSlider } from '@/shared/components'

interface RangePasswordSliderProps {
	length: number
	onChange: (value: number) => void
}

export function RangePasswordSlider({
	length,
	onChange
}: RangePasswordSliderProps) {
	return (
		<>
			<div className='password-length-slider'>
				<label className='password-length-slider__label'>
					Длина пароля: {length}
				</label>
				<RangeSlider
					min={6}
					max={32}
					step={1}
					value={[length]}
					onValueChange={values => onChange(values[0])}
				/>
			</div>
		</>
	)
}
