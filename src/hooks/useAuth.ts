import { useEffect } from 'react'

import { authStore } from '@/store/auth/auth.store'

export function useAuth() {
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setIsAuthenticated = authStore(state => state.setIsAuthenticated)

	useEffect(() => {
		const checkSessionCookie = () => {
			const cookies = document.cookie.split(';')
			const hasSessionCookie = cookies.some(
				cookie =>
					cookie.trim().startsWith('session=') &&
					cookie.trim().length > 10
			)
			setIsAuthenticated(hasSessionCookie)
		}

		checkSessionCookie()

		const interval = setInterval(checkSessionCookie, 1000)
		window.addEventListener('storage', checkSessionCookie)

		return () => {
			clearInterval(interval)
			window.removeEventListener('storage', checkSessionCookie)
		}
	}, [setIsAuthenticated])

	const auth = () => setIsAuthenticated(true)
	const exit = () => {
		setIsAuthenticated(false)
		localStorage.clear()
		sessionStorage.clear()
		document.cookie.split(';').forEach(c => {
			document.cookie = c
				.trim()
				.replace(
					/=.*/,
					'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
				)
		})
	}

	return {
		isAuthenticated,
		auth,
		exit
	}
}
