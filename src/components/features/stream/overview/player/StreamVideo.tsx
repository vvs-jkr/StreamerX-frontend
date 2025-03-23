import {
	useConnectionState,
	useRemoteParticipant,
	useTracks
} from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import { JSX } from 'react'

import { Skeleton } from '@/components/ui/common/Skeleton'

import { FindChannelByUsernameQuery } from '@/graphql/generated/output'

import { LoadingStream } from './LoadingStream'
import { OfflineStream } from './OfflineStream'
import { StreamPlayer } from './StreamPlayer'

interface StreamVideoProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function StreamVideo({ channel }: StreamVideoProps) {
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(channel.id)

	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone
	]).filter(track => track.participant.identity === channel.id)

	let content: JSX.Element

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineStream channel={channel} />
	} else if (!participant || tracks.length === 0) {
		content = <LoadingStream />
	} else {
		content = <StreamPlayer participant={participant} />
	}

	return (
		<div className='group relative mb-6 aspect-video rounded-lg'>
			{content}
		</div>
	)
}

export function StreamVideoSkeleton() {
	return (
		<div className='mb-6 aspect-video'>
			<Skeleton className='h-full w-full rounded-lg' />
		</div>
	)
}
