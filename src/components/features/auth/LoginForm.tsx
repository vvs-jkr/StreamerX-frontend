import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/common/Button'
import { Input } from '@/components/ui/common/Input'

import { useLoginUserMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
	login: z
		.string()
		.min(3, 'Логин должен содержать минимум 3 символа')
		.max(32, 'Логин не может быть длиннее 32 символов')
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			'Логин может содержать только буквы, цифры, - и _'
		)
		.trim(),
	password: z
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(64, 'Пароль не может быть длиннее 64 символов')
		.regex(
			/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
			'Пароль содержит недопустимые символы'
		)
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
	const t = useTranslations('auth')
	const router = useRouter()
	const { auth } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange'
	})

	const [login, { loading }] = useLoginUserMutation({
		onCompleted() {
			auth()
			toast.success(t('login.success'))
			router.replace('/dashboard')
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const onSubmit = async (data: LoginFormData) => {
		await login({
			variables: {
				data: {
					login: data.login.trim(),
					password: data.password
				}
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<div className='space-y-2'>
				<Input
					type='text'
					placeholder={t('login.placeholder')}
					{...register('login')}
					error={errors.login?.message}
					disabled={isSubmitting || loading}
				/>
				{errors.login && (
					<p className='text-sm text-destructive'>
						{errors.login.message}
					</p>
				)}
			</div>
			<div className='space-y-2'>
				<Input
					type='password'
					placeholder={t('password.placeholder')}
					{...register('password')}
					error={errors.password?.message}
					disabled={isSubmitting || loading}
				/>
				{errors.password && (
					<p className='text-sm text-destructive'>
						{errors.password.message}
					</p>
				)}
			</div>
			<Button
				type='submit'
				disabled={isSubmitting || loading || !isValid}
				className='w-full'
			>
				{loading ? t('login.loading') : t('login.submit')}
			</Button>
		</form>
	)
}

export default LoginForm
