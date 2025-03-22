import { Medal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/Tabs'

import {
	type FindChannelByUsernameQuery,
	useFindSponsorsByChannelQuery,
	useMakePaymentMutation
} from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'

import { convertPrice } from '@/utils/convert-price'

interface SupportButtonProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function SupportButton({ channel }: SupportButtonProps) {
	const t = useTranslations('stream.actions.support')
	const router = useRouter()

	const { isAuthenticated } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	const { data } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id
		}
	})
	const sponsors = data?.findSponsorsByChannel

	const [makePayment, { loading: isLoadingMakePayment }] =
		useMakePaymentMutation({
			onCompleted(data) {
				router.push(data.makePayment.url)
			},
			onError() {
				toast.error(t('errorMessage'))
			}
		})

	const isSponsor = sponsors?.some(sponsor => sponsor.user.id === user?.id)
	const isOwnerChannel = user?.id === channel.id

	if (isOwnerChannel || isLoadingProfile) {
		return null
	}

	if (isSponsor) {
		return (
			<Button variant='secondary' disabled>
				<Medal className='size-4' />
				{t('alreadySponsor')}
			</Button>
		)
	}

	return isAuthenticated ? (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='secondary'>
					<Medal className='size-4' />
					{t('supportAuthor')}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<Tabs defaultValue={channel.sponsorshipPlans[0].id}>
					<TabsList className='mb-1'>
						{channel.sponsorshipPlans.map((plan, index) => (
							<TabsTrigger key={index} value={plan.id}>
								{plan.title}
							</TabsTrigger>
						))}
					</TabsList>
					{channel.sponsorshipPlans.map((plan, index) => (
						<TabsContent key={index} value={plan.id}>
							<DialogTitle className='text-2xl'>
								{convertPrice(plan.price)}
							</DialogTitle>
							{plan.description && (
								<DialogDescription className='mt-2 text-sm'>
									{plan.description}
								</DialogDescription>
							)}
							<Button
								onClick={() =>
									makePayment({
										variables: { planId: plan.id }
									})
								}
								className='mt-3 w-full'
								disabled={isLoadingMakePayment}
							>
								{t('choose')}
							</Button>
						</TabsContent>
					))}
				</Tabs>
			</DialogContent>
		</Dialog>
	) : (
		<Button
			onClick={() => router.push('/account/login')}
			variant='secondary'
		>
			<Medal className='size-4' />
			{t('supportAuthor')}
		</Button>
	)
}
