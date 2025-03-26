import { z } from 'zod'

export const loginSchema = z.object({
	login: z.string().min(1, 'Введите логин или email'),
	password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
	pin: z.string().optional()
})

export type TypeLoginSchema = z.infer<typeof loginSchema>
