import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies, nextUrl } = request

	const session = cookies.get('session')?.value

	const isAuthRoute = nextUrl.pathname.startsWith('/account')
	const isDeactivateRoute = nextUrl.pathname === '/account/deactivate'
	const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
	const isProfileRoute = nextUrl.pathname.startsWith('/profile')
	const isStreamRoute = nextUrl.pathname.startsWith('/stream')
	const isSettingsRoute = nextUrl.pathname.startsWith('/settings')
	const isHomeRoute = nextUrl.pathname === '/'

	const isProtectedRoute =
		isDashboardRoute ||
		isProfileRoute ||
		isStreamRoute ||
		isSettingsRoute ||
		isDeactivateRoute ||
		(!isHomeRoute && !isAuthRoute)

	if (!session && isProtectedRoute) {
		return NextResponse.redirect(new URL('/account/login', url))
	}

	if (session && isAuthRoute && !isDeactivateRoute) {
		return NextResponse.redirect(new URL('/dashboard/settings', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
