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

	const isLoginRoute = pathname.startsWith('/account/login')
	const isRegisterRoute = pathname.startsWith('/account/create')
	const isHomeRoute = pathname === '/'

	const isProtectedRoute =
		pathname.startsWith('/dashboard') ||
		pathname.startsWith('/profile') ||
		pathname.startsWith('/stream') ||
		pathname.startsWith('/settings') ||
		pathname === '/account/deactivate' ||
		(!isHomeRoute && !pathname.startsWith('/account'))

	useEffect(() => {
		if (!isAuthenticated && isProtectedRoute) {
			router.push('/account/login')
		}

		if (isAuthenticated && (isLoginRoute || isRegisterRoute)) {
			router.push('/dashboard/settings')
		}
	}, [
		pathname,
		isAuthenticated,
		isProtectedRoute,
		isLoginRoute,
		isRegisterRoute,
		router
	])

	return <>{children}</>
}
