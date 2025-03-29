import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies, nextUrl } = request

	const sessionCookie = cookies.get('session')
	const hasValidSession =
		sessionCookie?.value && sessionCookie.value.length > 10

	const isAuthRoute = nextUrl.pathname.startsWith('/account')
	const isDeactivateRoute = nextUrl.pathname === '/account/deactivate'
	const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
	const isProfileRoute = nextUrl.pathname.startsWith('/profile')
	const isStreamRoute = nextUrl.pathname.startsWith('/stream')
	const isSettingsRoute = nextUrl.pathname.startsWith('/settings')
	const isHomeRoute = nextUrl.pathname === '/'
	const isLoginRoute = nextUrl.pathname === '/account/login'
	const isRegisterRoute = nextUrl.pathname === '/account/create'

	const isProtectedRoute =
		isDashboardRoute ||
		isProfileRoute ||
		isStreamRoute ||
		isSettingsRoute ||
		isDeactivateRoute ||
		(!isHomeRoute && !isAuthRoute)

	if (!hasValidSession && isProtectedRoute) {
		const response = NextResponse.redirect(new URL('/account/login', url))
		response.headers.set('Cache-Control', 'no-store, max-age=0')
		return response
	}

	if (hasValidSession && (isLoginRoute || isRegisterRoute)) {
		return NextResponse.redirect(new URL('/dashboard/settings', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
