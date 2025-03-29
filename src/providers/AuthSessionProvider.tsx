'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

export function AuthSessionProvider({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const router = useRouter()
	const { isAuthenticated } = useAuth()

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
		if (!isAuthenticated && isProtectedRoute) {
			router.replace('/account/login')
			return
		}

		if (isAuthenticated && (isLoginRoute || isRegisterRoute)) {
			router.replace('/dashboard/settings')
			return
		}
	}, [
		isAuthenticated,
		isProtectedRoute,
		isLoginRoute,
		isRegisterRoute,
		router
	])

	return <>{children}</>
}
