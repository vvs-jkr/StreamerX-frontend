import { Bell, Check, Fingerprint, Medal, Radio, User } from 'lucide-react'

import { NotificationType } from '@/graphql/generated/output'

export function getNotificationIcon(type: NotificationType) {
	switch (type) {
		case NotificationType.StreamStart:
			return Radio
		case NotificationType.NewFollower:
			return User
		case NotificationType.NewSponsorship:
			return Medal
		case NotificationType.EnableTwoFactor:
			return Fingerprint
		case NotificationType.VerifiedChannel:
			return Check
		default:
			return Bell
	}
}
