import { useTranslations } from 'next-intl'
import Link from 'next/link'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'
import { Skeleton } from '@/components/ui/common/Skeleton'

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'

import { getSocialIcon } from '@/utils/get-social-icon'

interface AboutChannelProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function AboutChannel({ channel }: AboutChannelProps) {
	const t = useTranslations('stream.aboutChannel')

	return (
		<Card className='mt-6'>
			<CardHeader className='p-4'>
				<CardTitle className='text-xl'>
					{t('heading')} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className='-mt-1 space-y-2 px-4'>
				<div className='text-[15px] text-foreground'>
					<span className='font-semibold'>
						{channel.followings.length}
					</span>{' '}
					{t('followersCount')}
				</div>
				<div className='text-[15px] text-muted-foreground'>
					{channel.bio ?? t('noDescription')}
				</div>
				{channel.socialLinks.length ? (
					<div className='grid gap-x-3 md:grid-cols-3 xl:grid-cols-8'>
						{channel.socialLinks.map((socialLink, index) => {
							const Icon = getSocialIcon(socialLink.url)

							return (
								<Link
									key={index}
									href={socialLink.url}
									className='flex items-center pr-1 text-[15px] hover:text-primary'
									target='_blank'
								>
									<Icon className='mr-2 size-4' />
									{socialLink.title}
								</Link>
							)
						})}
					</div>
				) : null}
			</CardContent>
		</Card>
	)
}

export function AboutChannelSkeleton() {
	return <Skeleton className='mt-6 h-36 w-full' />
}
