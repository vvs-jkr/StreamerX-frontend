import { Link } from 'lucide-react'
import {
	FaDiscord,
	FaGithub,
	FaInstagram,
	FaTelegram,
	FaTiktok,
	FaXTwitter,
	FaYoutube
} from 'react-icons/fa6'

export function getSocialIcon(url: string) {
	switch (true) {
		case url.includes('t.me'):
			return FaTelegram
		case url.includes('youtube.com') || url.includes('youtu.be'):
			return FaYoutube
		case url.includes('twitter.com') || url.includes('x.com'):
			return FaXTwitter
		case url.includes('discord.com') || url.includes('discord.gg'):
			return FaDiscord
		case url.includes('tiktok.com'):
			return FaTiktok
		case url.includes('github.com'):
			return FaGithub
		case url.includes('instagram.com'):
			return FaInstagram
		default:
			return Link
	}
}
