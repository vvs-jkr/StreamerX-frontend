import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const session = request.cookies.get('session')
	const isAuth = !!session

	const isLoginRoute = request.nextUrl.pathname.startsWith('/login')
	const isRegisterRoute = request.nextUrl.pathname.startsWith('/register')
	const isHomeRoute = request.nextUrl.pathname === '/'
	const isProtectedRoute =
		request.nextUrl.pathname.startsWith('/account') ||
		request.nextUrl.pathname.startsWith('/dashboard') ||
		request.nextUrl.pathname.startsWith('/profile') ||
		request.nextUrl.pathname.startsWith('/stream') ||
		request.nextUrl.pathname.startsWith('/settings')

	if (!isAuth) {
		if (isProtectedRoute) {
			return NextResponse.redirect(new URL('/login', request.url))
		}
	} else {
		if (isLoginRoute || isRegisterRoute) {
			return NextResponse.redirect(
				new URL('/dashboard/settings', request.url)
			)
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/account/:path*',
		'/dashboard/:path*',
		'/profile/:path*',
		'/stream/:path*',
		'/settings/:path*',
		'/login',
		'/register'
	]
}
