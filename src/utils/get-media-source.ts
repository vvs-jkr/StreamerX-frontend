import { MEDIA_URL } from '@/libs/constants/url.constants'

// export function getMediaSource(path: string | undefined | null) {
// 	return MEDIA_URL + path
// }

export function getMediaSource(
	path: string | undefined | null
): string | undefined {
	if (!path) return undefined

	// Если это подписанный URL, возвращаем его как есть
	if (path.includes('?X-Amz-')) {
		return path
	}

	// Иначе формируем полный URL
	return MEDIA_URL + path
}
