import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/common/Button'
import { Slider } from '@/components/ui/common/Slider'
import { Hint } from '@/components/ui/elements/Hint'

interface VolumeControlProps {
	onToggle: () => void
	onChange: (value: number) => void
	value: number
}

export function VolumeControl({
	onToggle,
	onChange,
	value
}: VolumeControlProps) {
	const t = useTranslations('stream.video.player')

	const isMuted = value === 0
	const isAboveHalf = value > 50

	let Icon = Volume1

	if (isMuted) {
		Icon = VolumeX
	} else if (isAboveHalf) {
		Icon = Volume2
	}

	function handleChange(value: number[]) {
		onChange(value[0])
	}

	return (
		<div className='flex items-center gap-2'>
			<Hint label={t('volume')} asChild>
				<Button
					variant='ghost'
					size='icon'
					onClick={onToggle}
					className='text-white hover:bg-white/10'
				>
					<Icon className='size-6' />
				</Button>
			</Hint>
			<Slider
				className='w-32 cursor-pointer'
				onValueChange={handleChange}
				value={[value]}
				max={100}
				step={1}
			/>
		</div>
	)
}
