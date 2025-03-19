'use client'

import { useTranslations } from 'next-intl'

import { Heading } from '@/components/ui/elements/Heading'
import { ToggleCardSkeleton } from '@/components/ui/elements/ToggleCard'

import {
	useFindCurrentSessionQuery,
	useFindSessionsByUserQuery
} from '@/graphql/generated/output'

import { SessionItem } from './SessionItem'

export function SessionsList() {
	const t = useTranslations('dashboard.settings.sessions')

	const { data: sessionData, loading: isLoadingCurrent } =
		useFindCurrentSessionQuery()
	const currentSession = sessionData?.findCurrentSession!

	const { data: sessionsData, loading: isLoadingSessions } =
		useFindSessionsByUserQuery()
	const sessions = sessionsData?.findSessionsByUser ?? []

	return (
		<div className='space-y-6'>
			<Heading title={t('info.current')} size='sm' />
			{isLoadingCurrent ? (
				<ToggleCardSkeleton />
			) : (
				<SessionItem session={currentSession} isCurrentSession />
			)}
			<Heading title={t('info.active')} size='sm' />
			{isLoadingSessions ? (
				Array.from({ length: 3 }).map((_, index) => (
					<ToggleCardSkeleton key={index} />
				))
			) : sessions.length ? (
				sessions.map((session, index) => (
					<SessionItem key={index} session={session} />
				))
			) : (
				<div className='text-muted-foreground'>
					{t('info.notFound')}
				</div>
			)}
		</div>
	)
}
