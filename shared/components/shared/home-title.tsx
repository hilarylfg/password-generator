import { TextType } from '@/shared/components'

export function HomeTitle() {
	return (
		<div className='home-title'>
			<TextType
				text={[
					'Генерируем надежные пароли за секунды',
					'Прощай, "qwerty123"...',
					'Создаем пароли, которые невозможно взломать... и запомнить',
					'Генерируем что-то посложнее, чем дата вашего рождения'
				]}
				typingSpeed={75}
				pauseDuration={6000}
				showCursor={true}
				cursorCharacter='|'
			/>
		</div>
	)
}
