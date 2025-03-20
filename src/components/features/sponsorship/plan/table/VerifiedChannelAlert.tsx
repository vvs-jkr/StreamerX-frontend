import { ShieldAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function VerifiedChannelAlert() {
	const t = useTranslations('dashboard.plans.alert')

	return (
		<div className='flex h-[75vh] w-full flex-col items-center justify-center'>
			<ShieldAlert className='size-20 text-muted-foreground' />
			<h1 className='mt-6 text-2xl font-semibold'>{t('heading')}</h1>
			<p className='mt-3 w-full items-center text-center text-muted-foreground lg:w-[60%]'>
				{t('description')}
			</p>
		</div>
	)
}
