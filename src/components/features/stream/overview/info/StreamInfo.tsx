import { useParticipants } from '@livekit/components-react'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Skeleton } from '@/components/ui/common/Skeleton'
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar'
import { ChannelVerified } from '@/components/ui/elements/ChannelVerified'

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'

import { StreamActions, StreamActionsSkeleton } from './StreamActions'

interface StreamInfoProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamInfo({ channel }: StreamInfoProps) {
	const t = useTranslations('stream.info')

	const participants = useParticipants()

	const participantCount = participants.length - 1

	return (
		<div className='space-y-5'>
			<h1 className='text-xl font-semibold'>
				{channel.stream.title}{' '}
				{channel.stream.category &&
					` | ${channel.stream.category.title}`}
			</h1>
			<div className='flex flex-col items-start justify-between lg:flex-row'>
				<div className='flex items-center gap-x-3 px-1'>
					<ChannelAvatar
						channel={channel}
						isLive={channel.stream.isLive}
						size='lg'
					/>
					<div className='space-y-1'>
						<h2 className='flex items-center gap-x-2 text-lg font-semibold'>
							{channel.displayName}
							{channel.isVerified && <ChannelVerified />}
						</h2>
						{channel.stream.isLive ? (
							<div className='flex items-center gap-x-1 text-xs font-semibold text-rose-500'>
								<User className='size-4' />
								{participantCount} {t('viewers')}
							</div>
						) : (
							<p className='text-xs font-semibold text-muted-foreground'>
								{t('offline')}
							</p>
						)}
					</div>
				</div>
				<StreamActions channel={channel} />
			</div>
		</div>
	)
}

export function StreamInfoSkeleton() {
	return (
		<div className='space-y-5'>
			<Skeleton className='h-7 w-[60%]' />
			<div className='flex flex-col items-start justify-between lg:flex-row'>
				<div className='flex items-center gap-x-3 px-1'>
					<Skeleton className='size-14 rounded-full' />
					<div className='space-y-2.5'>
						<Skeleton className='h-4 w-32' />
						<Skeleton className='h-3 w-20' />
					</div>
				</div>
				<StreamActionsSkeleton />
			</div>
		</div>
	)
}
