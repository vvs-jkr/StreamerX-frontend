'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form, FormField } from '@/components/ui/common/Form'
import {
	ToggleCard,
	ToggleCardSkeleton
} from '@/components/ui/elements/ToggleCard'

import { useChangeNotificationsSettingsMutation } from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	type TypeChangeNotificationsSettingsSchema,
	changeNotificationsSettingsSchema
} from '@/schemas/user/change-notifications-settings.schema'

export function ChangeNotificationsSettingsForm() {
	const t = useTranslations('dashboard.settings.notifications')

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangeNotificationsSettingsSchema>({
		resolver: zodResolver(changeNotificationsSettingsSchema),
		values: {
			siteNotifications:
				user?.notificationSettings.siteNotifications ?? false,
			telegramNotifications:
				user?.notificationSettings.telegramNotifications ?? false
		}
	})

	const [update, { loading: isLoadingUpdate }] =
		useChangeNotificationsSettingsMutation({
			onCompleted(data) {
				refetch()
				toast.success(t('successMessage'))

				if (data.changeNotificationsSettings.telegramAuthToken) {
					window.open(
						`https://t.me/TeaStreamBot?start=${data.changeNotificationsSettings.telegramAuthToken}`,
						'_blank'
					)
				}
			},
			onError() {
				toast.error(t('errorMessage'))
			}
		})

	function onChange(
		field: keyof TypeChangeNotificationsSettingsSchema,
		value: boolean
	) {
		form.setValue(field, value)

		update({
			variables: {
				data: { ...form.getValues(), [field]: value }
			}
		})
	}

	return isLoadingProfile ? (
		Array.from({ length: 2 }).map((_, index) => (
			<ToggleCardSkeleton key={index} />
		))
	) : (
		<Form {...form}>
			<FormField
				control={form.control}
				name='siteNotifications'
				render={({ field }) => (
					<ToggleCard
						heading={t('siteNotifications.heading')}
						description={t('siteNotifications.description')}
						isDisabled={isLoadingUpdate}
						value={field.value}
						onChange={value => onChange('siteNotifications', value)}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='telegramNotifications'
				render={({ field }) => (
					<ToggleCard
						heading={t('telegramNotifications.heading')}
						description={t('telegramNotifications.description')}
						isDisabled={isLoadingUpdate}
						value={field.value}
						onChange={value =>
							onChange('telegramNotifications', value)
						}
					/>
				)}
			/>
		</Form>
	)
}
