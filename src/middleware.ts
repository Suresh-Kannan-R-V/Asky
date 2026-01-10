import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Example cookies (replace with real logic)
    const token = req.cookies.get('token')?.value;
    const role = req.cookies.get('role')?.value;

    // 1️⃣ Root redirect
    if (pathname === '/') {
        return NextResponse.redirect(
            new URL(token ? '/ua' : '/login', req.url)
        );
    }

    // 2️⃣ Protect UA routes
    if (pathname.startsWith('/ua')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // 3️⃣ Role-based protection
        if (pathname.startsWith('/ua/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/ua', req.url));
        }
    }

    // 4️⃣ Prevent logged-in users from login page
    if (pathname.startsWith('/login') && token) {
        return NextResponse.redirect(new URL('/ua', req.url));
    }

    return NextResponse.next();
}

// Apply only to needed paths
export const config = {
    matcher: ['/', '/login', '/ua/:path*'],
};
