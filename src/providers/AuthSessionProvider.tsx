'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'

type RedirectStrategy = {
	shouldRedirect: () => boolean
	getRedirectPath: () => string
}

export function AuthSessionProvider({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const router = useRouter()
	const { isAuthenticated } = useAuth()
	const { isLoadingProfile, user } = useCurrent()
	const [isInitialLoad, setIsInitialLoad] = useState(true)

	const isLoginRoute = pathname === '/account/login'
	const isRegisterRoute = pathname === '/account/create'
	const isAuthRoute = pathname.startsWith('/account')
	const isProtectedRoute =
		pathname.startsWith('/dashboard') ||
		pathname.startsWith('/profile') ||
		pathname.startsWith('/stream') ||
		pathname.startsWith('/settings') ||
		pathname.startsWith('/categories') ||
		pathname.startsWith('/users')

	const redirectStrategies: RedirectStrategy[] = [
		{
			shouldRedirect: () =>
				Boolean(
					!isAuthenticated && isProtectedRoute && !isLoadingProfile
				),
			getRedirectPath: () => '/account/login'
		},
		{
			shouldRedirect: () =>
				Boolean(
					isAuthenticated &&
						!user &&
						isProtectedRoute &&
						!isLoadingProfile
				),
			getRedirectPath: () => '/account/login'
		},
		{
			shouldRedirect: () =>
				Boolean(
					isAuthenticated &&
						user &&
						(isLoginRoute || isRegisterRoute) &&
						!isLoadingProfile
				),
			getRedirectPath: () => '/dashboard'
		}
	]

	useEffect(() => {
		const redirect = async () => {
			try {
				const strategy = redirectStrategies.find(s =>
					s.shouldRedirect()
				)
				if (strategy) {
					await router.replace(strategy.getRedirectPath())
				}
			} catch (error) {
				console.error('Navigation failed:', error)
			} finally {
				if (!isLoadingProfile) {
					setIsInitialLoad(false)
				}
			}
		}

		redirect()
	}, [
		isAuthenticated,
		isProtectedRoute,
		isLoginRoute,
		isRegisterRoute,
		router,
		isLoadingProfile,
		user,
		redirectStrategies
	])

	if (
		isInitialLoad ||
		(isLoadingProfile && (isProtectedRoute || isAuthenticated))
	) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
				<div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
			</div>
		)
	}

	if (!isAuthenticated && isProtectedRoute) {
		return null
	}

	if (isAuthenticated && !user && isProtectedRoute) {
		return null
	}

	return <>{children}</>
}
