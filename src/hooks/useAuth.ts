import { useEffect } from 'react'

import { authStore } from '@/store/auth/auth.store'

import { useCurrent } from './useCurrent'

export function useAuth() {
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setIsAuthenticated = authStore(state => state.setIsAuthenticated)
	const { user, refetch } = useCurrent()

	useEffect(() => {
		const checkSessionCookie = () => {
			const cookies = document.cookie.split(';')
			const sessionCookie = cookies.find(cookie =>
				cookie.trim().startsWith('session=')
			)
			const sessionValue = sessionCookie?.trim().split('=')[1]
			const hasValidSession = Boolean(
				sessionValue &&
					sessionValue.length > 32 &&
					!sessionValue.includes('undefined')
			)

			if (isAuthenticated !== hasValidSession) {
				setIsAuthenticated(hasValidSession)
				if (hasValidSession) {
					refetch()
				}
			}
		}

		checkSessionCookie()
		const interval = setInterval(checkSessionCookie, 3000)
		window.addEventListener('storage', checkSessionCookie)

		return () => {
			clearInterval(interval)
			window.removeEventListener('storage', checkSessionCookie)
		}
	}, [isAuthenticated, setIsAuthenticated, refetch])

	const auth = () => {
		setIsAuthenticated(true)
		refetch()
	}

	const exit = () => {
		setIsAuthenticated(false)
		localStorage.clear()
		sessionStorage.clear()
		const cookies = document.cookie.split(';')
		cookies.forEach(cookie => {
			const [name] = cookie.split('=')
			document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
		})
	}

	return {
		isAuthenticated,
		auth,
		exit,
		user
	}
}
