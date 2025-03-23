import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { ColorSwitcher } from '@/components/ui/elements/ColorSwitcher'

import {
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_NAME
} from '@/libs/constants/seo.constants'
import { APP_URL } from '@/libs/constants/url.constants'

import { ApolloClientProvider } from '@/providers/ApolloClientProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ToastProvider } from '@/providers/ToastProvider'

import '@/styles/globals.css'
import '@/styles/themes.css'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s - ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	metadataBase: new URL(APP_URL),
	applicationName: SITE_NAME,
	authors: [
		{
			name: 'VS Dev',
			url: new URL('https://github.com/vvs-jkr')
		}
	],
	keywords: SITE_KEYWORDS,
	generator: 'Next.js',
	creator: 'VS',
	publisher: 'VSDev',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/touch-icons/256x256.png',
		other: {
			rel: 'touch-icons',
			url: '/touch-icons/256x256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		type: 'website',
		emails: ['help@vs-dev-streamerx.ru'],
		locale: 'ru_RU',
		images: [
			{
				url: '/touch-icons/512x512.png',
				width: 512,
				height: 512,
				alt: SITE_NAME
			}
		],
		url: new URL(APP_URL)
	},
	twitter: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: '/touch-icons/512x512.png',
				width: 512,
				height: 512,
				alt: SITE_NAME
			}
		]
	}
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={GeistSans.variable}>
				<ColorSwitcher />
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
