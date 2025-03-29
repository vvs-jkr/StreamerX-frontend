import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthStore } from './auth.types'

export const authStore = create<AuthStore>()(
	persist(
		set => ({
			isAuthenticated: false,
			setIsAuthenticated: (value: boolean) => {
				set({ isAuthenticated: value })
				if (!value) {
					localStorage.clear()
					sessionStorage.clear()
				}
			}
		}),
		{
			name: 'auth-storage'
		}
	)
)
