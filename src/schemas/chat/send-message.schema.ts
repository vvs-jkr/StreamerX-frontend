import { z } from 'zod'

export const sendMessageSchema = z.object({
	text: z.string().min(1)
})

export type TypeSendMessageSchema = z.infer<typeof sendMessageSchema>
