import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/common/Button'
import { Input } from '@/components/ui/common/Input'

import { useCreateUserMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

const createAccountSchema = z.object({
	username: z
		.string()
		.min(3, 'Имя пользователя должно содержать минимум 3 символа')
		.max(32, 'Имя пользователя не может быть длиннее 32 символов')
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			'Имя пользователя может содержать только буквы, цифры, - и _'
		)
		.trim(),
	email: z
		.string()
		.email('Введите корректный email')
		.min(3, 'Email должен содержать минимум 3 символа')
		.max(64, 'Email не может быть длиннее 64 символов'),
	password: z
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(64, 'Пароль не может быть длиннее 64 символов')
		.regex(
			/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
			'Пароль содержит недопустимые символы'
		)
})

type CreateAccountFormData = z.infer<typeof createAccountSchema>

const CreateAccountForm = () => {
	const t = useTranslations('auth')
	const router = useRouter()
	const { auth } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid }
	} = useForm<CreateAccountFormData>({
		resolver: zodResolver(createAccountSchema),
		mode: 'onChange'
	})

	const [createUser, { loading }] = useCreateUserMutation({
		onCompleted() {
			auth()
			toast.success(t('register.success'))
			router.replace('/dashboard/settings')
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const onSubmit = async (data: CreateAccountFormData) => {
		await createUser({
			variables: {
				data: {
					username: data.username.trim(),
					email: data.email.trim(),
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
					placeholder={t('username.placeholder')}
					{...register('username')}
					error={errors.username?.message}
					disabled={isSubmitting || loading}
				/>
				{errors.username && (
					<p className='text-sm text-destructive'>
						{errors.username.message}
					</p>
				)}
			</div>
			<div className='space-y-2'>
				<Input
					type='email'
					placeholder={t('email.placeholder')}
					{...register('email')}
					error={errors.email?.message}
					disabled={isSubmitting || loading}
				/>
				{errors.email && (
					<p className='text-sm text-destructive'>
						{errors.email.message}
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
				{loading ? t('register.loading') : t('register.submit')}
			</Button>
		</form>
	)
}

export default CreateAccountForm
