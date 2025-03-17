import { GeistSans } from 'geist/font/sans'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { ApolloClientProvider } from '@/providers/ApolloClientProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ToastProvider } from '@/providers/ToastProvider'

import '../styles/globals.css'

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={GeistSans.variable}>
				<ApolloClientProvider>
					<NextIntlClientProvider messages={messages}>
						<ThemeProvider
							attribute='class'
							defaultTheme='dark'
							disableTransitionOnChange
						>
							<ToastProvider />
							{children}
						</ThemeProvider>
					</NextIntlClientProvider>
				</ApolloClientProvider>
			</body>
		</html>
	)
}
