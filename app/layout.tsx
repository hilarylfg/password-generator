import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { ThemeProvider, ThemeSwitch } from '@/shared/components'
import '@/shared/styles/main.css'

const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
	weight: ['400', '700']
})

export const metadata: Metadata = {
	title: 'orbita-taxi'
}

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={nunito.variable}>
				<ThemeProvider
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ThemeSwitch />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
