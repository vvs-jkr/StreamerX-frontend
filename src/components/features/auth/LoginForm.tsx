import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/common/Input'

interface LoginFormData {
	login: string
	password: string
}

const LoginForm: React.FC = () => {
	const t = useTranslations()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>()
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
					{errors.login.message?.toString()}
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
					{errors.password.message?.toString()}
				</p>
			)}
			{/* ... rest of the component ... */}
		</form>
	)
}

export default LoginForm
