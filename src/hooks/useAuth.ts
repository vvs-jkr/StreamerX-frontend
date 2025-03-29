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
					cookie.trim().startsWith('session=') && cookie.length > 10
			)

			if (isAuthenticated !== hasSessionCookie) {
				setIsAuthenticated(hasSessionCookie)
			}
		}

		checkSessionCookie()

		const interval = setInterval(checkSessionCookie, 5000)

		return () => clearInterval(interval)
	}, [isAuthenticated, setIsAuthenticated])

	const auth = () => setIsAuthenticated(true)
	const exit = () => setIsAuthenticated(false)

	return {
		isAuthenticated,
		auth,
		exit
	}
}
