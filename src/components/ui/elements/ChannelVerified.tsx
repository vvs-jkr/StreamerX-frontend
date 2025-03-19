import { type VariantProps, cva } from 'class-variance-authority'
import { Check } from 'lucide-react'

import { cn } from '@/utils/tw-merge'

const channelVerifiedSizes = cva('', {
	variants: {
		size: {
			sm: 'size-3',
			default: 'size-4'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

interface ChannelVerifiedProps
	extends VariantProps<typeof channelVerifiedSizes> {}

export function ChannelVerified({ size }: ChannelVerifiedProps) {
	return (
		<span
			className={cn(
				'flex items-center justify-center rounded-full bg-primary',
				channelVerifiedSizes({ size })
			)}
		>
			<Check
				className={cn(
					'stroke-[4px] p-[3px] text-white',
					size === 'sm' ? 'size-2' : 'size-4'
				)}
			/>
		</span>
	)
}
