'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
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
	FormLabel,
	FormMessage
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/InputOTP'

import { useLoginUserMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

import { type TypeLoginSchema, loginSchema } from '@/schemas/auth/login.schema'

import { AuthWrapper } from '../AuthWrapper'

export function LoginForm() {
	const t = useTranslations('auth.login')
	const { auth } = useAuth()
	const router = useRouter()
	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)
	const [serverError, setServerError] = useState<string | null>(null)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
			pin: ''
		},
		mode: 'onChange'
	})

	const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
		onCompleted(data) {
			if (!data.loginUser) {
				setServerError(t('errorMessage'))
				form.setError('login', { message: t('errorMessage') })
				form.setError('password', { message: t('errorMessage') })
				return
			}

			if (data.loginUser.message) {
				setIsShowTwoFactor(true)
				setServerError(null)
				form.clearErrors()
			} else if (data.loginUser.user) {
				auth()
				toast.success(t('successMessage'))
				router.push('/dashboard/settings')
			} else {
				setServerError(t('errorMessage'))
				form.setError('login', { message: t('errorMessage') })
				form.setError('password', { message: t('errorMessage') })
				toast.error(t('errorMessage'))
			}
		},
		onError(error) {
			const message = error.message.includes('pin must be')
				? t('pinError')
				: t('errorMessage')

			setServerError(message)

			if (isShowTwoFactor) {
				form.setError('pin', { message })
			} else {
				form.setError('login', { message })
				form.setError('password', { message })
			}

			toast.error(message)
		}
	})

	const { isValid, errors } = form.formState

	function onSubmit(data: TypeLoginSchema) {
		setServerError(null)
		form.clearErrors()

		login({
			variables: {
				data: {
					login: data.login,
					password: data.password,
					pin: ''
				}
			}
		})
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/account/create'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					{isShowTwoFactor ? (
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('pinLabel')}</FormLabel>
									<FormControl>
										<InputOTP
											maxLength={6}
											{...field}
											className={
												errors.pin
													? 'border-destructive'
													: ''
											}
										>
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
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						<>
							<FormField
								control={form.control}
								name='login'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('loginLabel')}</FormLabel>
										<FormControl>
											<Input
												placeholder='johndoe'
												disabled={isLoadingLogin}
												className={
													errors.login
														? 'border-destructive'
														: ''
												}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t('loginDescription')}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>
												{t('passwordLabel')}
											</FormLabel>
											<Link
												href='/account/recovery'
												className='ml-auto inline-block text-sm'
											>
												{t('forgotPassword')}
											</Link>
										</div>
										<FormControl>
											<Input
												placeholder='********'
												type='password'
												disabled={isLoadingLogin}
												className={
													errors.password
														? 'border-destructive'
														: ''
												}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t('passwordDescription')}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingLogin}
					>
						{t('submitButton')}
					</Button>
					{serverError && (
						<div className='mt-2 text-center text-sm text-destructive'>
							{serverError}
						</div>
					)}
				</form>
			</Form>
		</AuthWrapper>
	)
}
