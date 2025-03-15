import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts')

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '88d6197c-0d1c-43b9-a1b3-806e8d04acc1.selstorage.ru'
			}
		]
	}
}

export default withNextIntl(nextConfig)
