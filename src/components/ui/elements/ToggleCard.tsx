import { Skeleton } from '../common/Skeleton'
import { Switch } from '../common/Switch'

import { CardContainer } from './CardContainer'

interface ToggleCardProps {
	heading: string
	description: string
	isDisabled?: boolean
	value: boolean
	onChange: (value: boolean) => void
}

export function ToggleCard({
	heading,
	description,
	isDisabled,
	value,
	onChange
}: ToggleCardProps) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				<Switch
					checked={value}
					onCheckedChange={onChange}
					disabled={isDisabled}
				/>
			}
		/>
	)
}

export function ToggleCardSkeleton() {
	return <Skeleton className='mt-6 h-20 w-full' />
}
