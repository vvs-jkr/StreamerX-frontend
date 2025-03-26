import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'

const LoginForm: React.FC = () => {
	const t = useTranslations()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = async (data: any) => {
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
