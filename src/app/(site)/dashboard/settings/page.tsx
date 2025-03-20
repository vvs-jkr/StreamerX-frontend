import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { UserSettings } from '@/components/features/user/UserSettings'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.settings.header')

	return {
		title: t('heading'),
		description: t('description'),
		...NO_INDEX_PAGE
	}
}

export default function SettingsPage() {
	return <UserSettings />
}
