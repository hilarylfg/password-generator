import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { ThemeProvider, ThemeSwitch, Toaster } from '@/shared/components'
import '@/shared/styles/main.css'

const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
	weight: ['400', '700']
})

export const metadata: Metadata = {
	title: 'Генератор паролей'
}

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' type='image/svg+xml' href='/img/favicon.svg' />
			</head>
			<body className={nunito.variable}>
				<ThemeProvider
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ThemeSwitch />
					{children}
					<Toaster position='top-center' />
				</ThemeProvider>
			</body>
		</html>
	)
}
