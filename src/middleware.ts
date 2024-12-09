import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/credit', '/register', '/login']
const protectedRoutes = ['/report', '/campaign']

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)

	const cookieStore = await cookies()

	const accessToken = cookieStore.get('access-token')?.value

	if (isProtectedRoute && !accessToken) {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	if (
		isPublicRoute &&
		accessToken &&
		!req.nextUrl.pathname.startsWith('/campaign')
	) {
		return NextResponse.redirect(new URL('/campaign', req.nextUrl))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
