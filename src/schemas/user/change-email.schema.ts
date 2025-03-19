import { z } from 'zod'

export const changeEmailSchema = z.object({
	email: z.string().email()
})

export type TypeChangeEmailSchema = z.infer<typeof changeEmailSchema>
