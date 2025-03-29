import { useEffect } from 'react'

import {
	useClearSessionCookieMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { authStore } from '@/store/auth/auth.store'

export function useCurrent() {
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setIsAuthenticated = authStore(state => state.setIsAuthenticated)

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated,
		fetchPolicy: 'network-only'
	})
	const [clear] = useClearSessionCookieMutation()

	useEffect(() => {
		if (error) {
			if (isAuthenticated) {
				clear()
			}
			setIsAuthenticated(false)
			localStorage.clear()
			sessionStorage.clear()
			const cookies = document.cookie.split(';')
			cookies.forEach(cookie => {
				const [name] = cookie.split('=')
				document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
			})
		}
	}, [error, isAuthenticated, clear, setIsAuthenticated])

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch
	}
}
