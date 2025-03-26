import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/common/Input'
import { useCreateUserMutation } from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const createAccountSchema = z.object({
	username: z
		.string()
		.min(3, 'Имя пользователя должно содержать минимум 3 символа'),
	email: z.string().email('Введите корректный email'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

type CreateAccountFormData = z.infer<typeof createAccountSchema>

const CreateAccountForm: React.FC = () => {
	const t = useTranslations()
	const router = useRouter()
	const { login } = useAuth()
	const [isLoading, setIsLoading] = useState(false)

	const [createUser] = useCreateUserMutation({
		onCompleted() {
			toast.success(t('successMessage'))
			router.push('/dashboard/settings')
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateAccountFormData>({
		resolver: zodResolver(createAccountSchema)
	})

	const onSubmit = async (data: CreateAccountFormData) => {
		try {
			setIsLoading(true)
			await createUser({
				variables: {
					username: data.username,
					email: data.email,
					password: data.password
				}
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				type='text'
				placeholder={t('username.placeholder')}
				{...register('username')}
				data-state={errors.username ? 'error' : undefined}
				disabled={isLoading}
			/>
			{errors.username && (
				<p className='mt-1 text-sm text-destructive'>
					{errors.username.message}
				</p>
			)}
			<Input
				type='email'
				placeholder={t('email.placeholder')}
				{...register('email')}
				data-state={errors.email ? 'error' : undefined}
				disabled={isLoading}
			/>
			{errors.email && (
				<p className='mt-1 text-sm text-destructive'>
					{errors.email.message}
				</p>
			)}
			<Input
				type='password'
				placeholder={t('password.placeholder')}
				{...register('password')}
				data-state={errors.password ? 'error' : undefined}
				disabled={isLoading}
			/>
			{errors.password && (
				<p className='mt-1 text-sm text-destructive'>
					{errors.password.message}
				</p>
			)}
			<button
				type='submit'
				disabled={isLoading}
				className='mt-4 w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50'
			>
				{isLoading ? t('loading') : t('submit')}
			</button>
		</form>
	)
}

export default CreateAccountForm
