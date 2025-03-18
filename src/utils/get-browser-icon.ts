import { CircleHelp } from 'lucide-react'
import {
	FaChrome,
	FaEdge,
	FaFirefoxBrowser,
	FaOpera,
	FaSafari,
	FaYandex
} from 'react-icons/fa'

export function getBrowserIcon(browser: string) {
	switch (browser.toLowerCase()) {
		case 'chrome':
			return FaChrome
		case 'firefox':
			return FaFirefoxBrowser
		case 'safari':
			return FaSafari
		case 'edge':
			return FaEdge
		case 'microsoft edge':
			return FaEdge
		case 'opera':
			return FaOpera
		case 'yandex':
			return FaYandex
		case 'yandex browser':
			return FaYandex
		default:
			return CircleHelp
	}
}
