import { useTranslations } from 'next-intl'

import { Input } from '@/components/ui/common/Input'
import { CardContainer } from '@/components/ui/elements/CardContainer'
import { CopyButton } from '@/components/ui/elements/CopyButton'

interface StreamURLProps {
	value: string | null
}

export function StreamURL({ value }: StreamURLProps) {
	const t = useTranslations('dashboard.keys.url')

	return (
		<CardContainer
			heading={t('heading')}
			isRightContentFull
			rightContent={
				<div className='flex w-full items-center gap-x-4'>
					<Input
						placeholder={t('heading')}
						value={value ?? ''}
						disabled
					/>
					<CopyButton value={value} />
				</div>
			}
		/>
	)
}
