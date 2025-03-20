import { z } from 'zod'

export const changeStreamInfoSchema = z.object({
	title: z.string(),
	categoryId: z.string()
})

export type TypeChangeStreamInfoSchema = z.infer<typeof changeStreamInfoSchema>
