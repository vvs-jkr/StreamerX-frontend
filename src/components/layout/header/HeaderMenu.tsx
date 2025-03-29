'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/components/ui/common/Button'

import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'

import { ProfileMenu } from './ProfileMenu'

export function HeaderMenu() {
	const t = useTranslations('layout.header.headerMenu')
	const { isAuthenticated } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	if (isLoadingProfile) {
		return null
	}

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			{isAuthenticated && user ? (
				<ProfileMenu />
			) : (
				<>
					<Link href='/account/login'>
						<Button variant='secondary'>{t('login')}</Button>
					</Link>
					<Link href='/account/create'>
						<Button>{t('register')}</Button>
					</Link>
				</>
			)}
		</div>
	)
}
