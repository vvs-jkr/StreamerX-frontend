import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { SponsorsTable } from '@/components/features/sponsorship/subscription/table/SponsorsTable'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.sponsors.header')

	return {
		title: t('heading'),
		description: t('description'),
		...NO_INDEX_PAGE
	}
}

export default function SponsorsPage() {
	return <SponsorsTable />
}
