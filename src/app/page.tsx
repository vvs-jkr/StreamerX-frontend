'use client'

import { useTranslations } from 'next-intl'


export default function Home() {
	const t = useTranslations('layout')
	return <div>{t('header.logo.platform')}</div>
}
