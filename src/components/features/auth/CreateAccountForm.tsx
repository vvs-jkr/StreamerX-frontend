import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/common/Input'

interface CreateAccountFormData {
	username: string
	email: string
	password: string
}

const CreateAccountForm: React.FC = () => {
	const t = useTranslations()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateAccountFormData>()

	return (
		<form>
			<Input
				type='text'
				placeholder={t('username.placeholder')}
				{...register('username')}
				data-error={!!errors.username}
			/>
			{errors.username && (
				<p className='mt-1 text-sm text-destructive'>
					{errors.username.message?.toString()}
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
					{errors.email.message?.toString()}
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
		</form>
	)
}

export default CreateAccountForm
