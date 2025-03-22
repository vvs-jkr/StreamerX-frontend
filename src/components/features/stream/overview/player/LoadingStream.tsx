import { Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/common/Card'

export function LoadingStream() {
	const t = useTranslations('stream.video')

	return (
		<Card className='relative flex h-full flex-col items-center justify-center'>
			<Loader className='size-12 animate-spin text-muted-foreground' />
			<p className='mt-3 text-lg text-muted-foreground'>{t('loading')}</p>
		</Card>
	)
}
