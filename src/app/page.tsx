'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/common/Button'

export default function Home() {
	const t = useTranslations('layout')
	return <div>{t('header.logo.platform')}</div>
}
