import { useEffect } from 'react'

import {
	useClearSessionCookieMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { authStore } from '@/store/auth/auth.store'

export function useCurrent() {
	const isAuthenticated = authStore(state => state.isAuthenticated)
	const setUser = authStore(state => state.setUser)
	const clearAuth = authStore(state => state.clearAuth)

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated,
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})
	const [clear] = useClearSessionCookieMutation()

	useEffect(() => {
		if (error) {
			if (isAuthenticated) {
				clear()
			}
			clearAuth()
		} else if (data?.findProfile) {
			setUser(data.findProfile)
		}
	}, [error, data?.findProfile, isAuthenticated, clear, clearAuth, setUser])

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch
	}
}
