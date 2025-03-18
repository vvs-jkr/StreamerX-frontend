import { z } from 'zod'

export const newPasswordSchema = z
	.object({
		password: z.string().min(8),
		passwordRepeat: z.string().min(8)
	})
	.refine(data => data.password === data.passwordRepeat, {
		path: ['passwordRepeat']
	})

export type TypeNewPasswordSchema = z.infer<typeof newPasswordSchema>
