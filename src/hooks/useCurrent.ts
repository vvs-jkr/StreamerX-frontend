import { useEffect } from 'react'

import {
	useClearSessionCookieMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { useAuth } from 'c:/Users/joker/Downloads/full-stack-kopiya-twitch/full-stack-kopiya-twitch/frontend/src/hooks/useAuth'

export function useCurrent() {
	const { isAuthenticated, exit } = useAuth()

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated
	})
	const [clear] = useClearSessionCookieMutation()

	useEffect(() => {
		if (error) {
			if (isAuthenticated) {
				clear()
			}
			exit()
		}
	}, [isAuthenticated, exit, clear])

	return {
		user: data?.findProfile,
		isLoadingProfile: loading,
		refetch
	}
}
