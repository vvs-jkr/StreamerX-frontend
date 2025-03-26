import { z } from 'zod'

export const createAccountSchema = z.object({
	username: z
		.string()
		.min(1, 'Введите имя пользователя')
		.regex(
			/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
			'Имя пользователя может содержать только буквы, цифры и дефисы'
		),
	email: z
		.string()
		.email('Введите корректный email')
		.min(3, 'Email должен содержать минимум 3 символа'),
	password: z.string().min(8, 'Пароль должен содержать минимум 8 символов')
})

export type TypeCreateAccountSchema = z.infer<typeof createAccountSchema>
