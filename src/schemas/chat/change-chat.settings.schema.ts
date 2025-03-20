import { z } from 'zod'

export const changeChatSettingsSchema = z.object({
	isChatEnabled: z.boolean(),
	isChatFollowersOnly: z.boolean(),
	isChatPremiumFollowersOnly: z.boolean()
})

export type TypeChangeChatSettingsSchema = z.infer<
	typeof changeChatSettingsSchema
>
