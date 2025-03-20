import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PlansTable } from '@/components/features/sponsorship/plan/table/PlansTable'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.plans.header')

	return {
		title: t('heading'),
		description: t('description'),
		...NO_INDEX_PAGE
	}
}

export default function PlansPage() {
	return <PlansTable />
}
