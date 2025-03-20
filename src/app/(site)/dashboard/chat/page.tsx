import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { ChangeChatSettings } from '@/components/features/chat/settings/ChangeChatSettings'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.chat.header')

	return {
		title: t('heading'),
		description: t('description'),
		...NO_INDEX_PAGE
	}
}

export default function ChatSettingsPage() {
	return <ChangeChatSettings />
}
