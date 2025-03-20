import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { DeactivateForm } from '@/components/features/auth/forms/DeactivateForm'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.deactivate')

	return {
		title: t('heading'),
		...NO_INDEX_PAGE
	}
}

export default function DeactivatePage() {
	return <DeactivateForm />
}
