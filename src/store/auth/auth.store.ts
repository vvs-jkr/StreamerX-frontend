import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@/graphql/generated/output'

interface AuthState {
	isAuthenticated: boolean
	user: User | null
	setIsAuthenticated: (value: boolean) => void
	setUser: (user: User | null) => void
	clearAuth: () => void
}

export const authStore = create<AuthState>()(
	persist(
		set => ({
			isAuthenticated: false,
			user: null,
			setIsAuthenticated: (value: boolean) => {
				set({ isAuthenticated: value })
				if (!value) {
					set({ user: null })
				}
			},
			setUser: (user: User | null) => {
				set({ user, isAuthenticated: Boolean(user) })
			},
			clearAuth: () => {
				set({ isAuthenticated: false, user: null })
				localStorage.clear()
				sessionStorage.clear()
				document.cookie.split(';').forEach(cookie => {
					const [name] = cookie.split('=')
					document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
				})
			}
		}),
		{
			name: 'auth-storage',
			partialize: state => ({
				isAuthenticated: state.isAuthenticated,
				user: state.user
			})
		}
	)
)
