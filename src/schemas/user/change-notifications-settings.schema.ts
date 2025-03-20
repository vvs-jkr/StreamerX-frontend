import { z } from 'zod'

export const changeNotificationsSettingsSchema = z.object({
	siteNotifications: z.boolean(),
	telegramNotifications: z.boolean()
})

export type TypeChangeNotificationsSettingsSchema = z.infer<
	typeof changeNotificationsSettingsSchema
>
