'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/InputOTP'

import { useDeactivateAccountMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

import {
	type TypeDeactivateSchema,
	deactivateSchema
} from '@/schemas/auth/deactivate.schema'

import { AuthWrapper } from '../AuthWrapper'

export function DeactivateForm() {
	const t = useTranslations('auth.deactivate')

	const { exit } = useAuth()

	const router = useRouter()

	const [isShowConfirm, setIsShowConfirm] = useState(false)

	const form = useForm<TypeDeactivateSchema>({
		resolver: zodResolver(deactivateSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const [deactivate, { loading: isLoadingDeactivate }] =
		useDeactivateAccountMutation({
			onCompleted(data) {
				if (data.deactivateAccount.message) {
					setIsShowConfirm(true)
				} else {
					exit()
					toast.success(t('successMessage'))
					router.push('/')
				}
			},
			onError() {
				toast.error(t('errorMessage'))
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: TypeDeactivateSchema) {
		deactivate({ variables: { data } })
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/dashboard/settings'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					{isShowConfirm ? (
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('pinLabel')}</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										{t('pinDescription')}
									</FormDescription>
								</FormItem>
							)}
						/>
					) : (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('emailLabel')}</FormLabel>
										<FormControl>
											<Input
												placeholder='john.doe@example.com'
												disabled={isLoadingDeactivate}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t('emailDescription')}
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t('passwordLabel')}
										</FormLabel>
										<FormControl>
											<Input
												placeholder='********'
												type='password'
												disabled={isLoadingDeactivate}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t('passwordDescription')}
										</FormDescription>
									</FormItem>
								)}
							/>
						</>
					)}
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingDeactivate}
					>
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
