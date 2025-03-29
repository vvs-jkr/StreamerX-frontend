'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'

export function AuthSessionProvider({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const router = useRouter()
	const { isAuthenticated } = useAuth()
	const { isLoadingProfile } = useCurrent()

	const isLoginRoute = pathname === '/account/login'
	const isRegisterRoute = pathname === '/account/create'
	const isHomeRoute = pathname === '/'
	const isAuthRoute = pathname.startsWith('/account')

	const isProtectedRoute =
		pathname.startsWith('/dashboard') ||
		pathname.startsWith('/profile') ||
		pathname.startsWith('/stream') ||
		pathname.startsWith('/settings') ||
		pathname === '/account/deactivate' ||
		(!isHomeRoute && !isAuthRoute)

	useEffect(() => {
		if (isLoadingProfile) return

		const redirect = async () => {
			try {
				if (!isAuthenticated && isProtectedRoute) {
					await router.replace('/account/login')
					return
				}

				if (isAuthenticated && (isLoginRoute || isRegisterRoute)) {
					await router.replace('/dashboard/settings')
					return
				}
			} catch (error) {
				console.error('Navigation failed:', error)
			}
		}

		redirect()
	}, [
		isAuthenticated,
		isProtectedRoute,
		isLoginRoute,
		isRegisterRoute,
		router,
		isLoadingProfile
	])

	return <>{children}</>
}
