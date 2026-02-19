import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/login', '/register', '/forgot-password'];

    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
    );

    // 🔒 Not logged in → block private routes
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/register', request.url));
    }

    // 🔐 Logged in → block auth pages
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|api).*)',
    ],
};
