'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { LogoImage } from '@/components/images/LogoImage'

export function Logo() {
	const t = useTranslations('layout.header.logo')

	return (
		<Link
			href='/'
			className='flex items-center gap-x-4 transition-opacity hover:opacity-75'
		>
			<LogoImage />
			<div className='hidden leading-tight lg:block'>
				<h2 className='text-lg font-semibold tracking-wider text-accent-foreground'>
					StreamerX
				</h2>
				<p className='text-sm text-muted-foreground'>{t('platform')}</p>
			</div>
		</Link>
	)
}
