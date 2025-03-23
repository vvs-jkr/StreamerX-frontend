'use client'

import { LiveKitRoom } from '@livekit/components-react'

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'

import { useStreamToken } from '@/hooks/useStreamToken'

import { LiveChat, LiveChatSkeleton } from '../../chat/live/LiveChat'

import { AboutChannel, AboutChannelSkeleton } from './info/AboutChannel'
import { ChannelSponsors } from './info/ChannelSponsors'
import { StreamInfo, StreamInfoSkeleton } from './info/StreamInfo'
import { StreamVideo, StreamVideoSkeleton } from './player/StreamVideo'

interface StreamOverviewProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamOverview({ channel }: StreamOverviewProps) {
	const { token, name, identity } = useStreamToken(channel.id)

	if (!token || !name || !identity) {
		return <StreamOverviewSkeleton />
	}

	return (
		<LiveKitRoom
			token={token}
			serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
			className='mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7'
		>
			<div className='order-1 col-span-1 flex flex-col lg:col-span-5'>
				<StreamVideo channel={channel} />
				<StreamInfo channel={channel} />
				<AboutChannel channel={channel} />
				<ChannelSponsors channel={channel} />
			</div>
			<div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
				<LiveChat
					channel={channel}
					isChatEnabled={channel.stream.isChatEnabled}
					isChatFollowersOnly={channel.stream.isChatFollowersOnly}
					isChatPremiumFollowersOnly={
						channel.stream.isChatPremiumFollowersOnly
					}
				/>
			</div>
		</LiveKitRoom>
	)
}

export function StreamOverviewSkeleton() {
	return (
		<div className='mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7'>
			<div className='order-1 col-span-1 flex flex-col lg:col-span-5'>
				<StreamVideoSkeleton />
				<StreamInfoSkeleton />
				<AboutChannelSkeleton />
			</div>
			<div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
				<LiveChatSkeleton />
			</div>
		</div>
	)
}
