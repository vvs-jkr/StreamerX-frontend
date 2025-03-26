import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/common/Input'

const loginSchema = z.object({
	login: z.string().min(3, 'Логин должен содержать минимум 3 символа'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
	const t = useTranslations()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema)
	})
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true)
		// Handle form submission
		setIsLoading(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				type='text'
				placeholder={t('login.placeholder')}
				{...register('login')}
				data-error={!!errors.login}
			/>
			{errors.login && (
				<p className='mt-1 text-sm text-destructive'>
					{errors.login.message}
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
			{/* ... rest of the component ... */}
		</form>
	)
}

export default LoginForm
