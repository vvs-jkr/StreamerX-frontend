import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useClearSessionCookieMutation } from '@/graphql/generated/output'

import { authStore } from '@/store/auth/auth.store'

export function useAuth() {
	const router = useRouter()
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setIsAuthenticated = authStore(state => state.setIsAuthenticated)
	const [clearSession] = useClearSessionCookieMutation()

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
				if (!hasValidSession && isAuthenticated) {
					clearSession()
					localStorage.clear()
					sessionStorage.clear()
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
	}, [isAuthenticated, setIsAuthenticated, clearSession])

	const auth = () => {
		setIsAuthenticated(true)
	}

	const exit = async () => {
		await clearSession()
		setIsAuthenticated(false)
		localStorage.clear()
		sessionStorage.clear()
	}

	return {
		isAuthenticated,
		auth,
		exit
	}
}
