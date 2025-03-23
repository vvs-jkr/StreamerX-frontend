import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts')

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '1be2ba22-cd21-4ed5-b217-f67faaa6c27e.selstorage.ru'
			}
		]
	}
}

export default withNextIntl(nextConfig)
