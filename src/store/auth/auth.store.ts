import { create } from 'zustand'

import type { AuthStore } from './auth.types'

export const authStore = create<AuthStore>(set => ({
	isAuthenticated: false,
	setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value })
}))
