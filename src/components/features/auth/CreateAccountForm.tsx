import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/common/Input'

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
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateAccountFormData>({
		resolver: zodResolver(createAccountSchema)
	})

	return (
		<form onSubmit={handleSubmit(data => console.log(data))}>
			<Input
				type='text'
				placeholder={t('username.placeholder')}
				{...register('username')}
				data-error={!!errors.username}
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
				data-error={!!errors.email}
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
				data-error={!!errors.password}
			/>
			{errors.password && (
				<p className='mt-1 text-sm text-destructive'>
					{errors.password.message}
				</p>
			)}
		</form>
	)
}

export default CreateAccountForm
