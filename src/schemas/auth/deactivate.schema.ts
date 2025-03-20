import { z } from 'zod'

export const deactivateSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	pin: z.string().optional()
})

export type TypeDeactivateSchema = z.infer<typeof deactivateSchema>
