import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'pm-session';
const secretKey = process.env.SESSION_SECRET;

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/signup'];
const PUBLIC_PREFIXES = ['/api/auth/', '/_next/', '/favicon.ico'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public prefixes (static, api auth, etc.)
  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow static file extensions
  if (/\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  // Verify session
  let isAuthenticated = false;
  if (sessionCookie && secretKey) {
    try {
      const encodedKey = new TextEncoder().encode(secretKey);
      await jwtVerify(sessionCookie, encodedKey, { algorithms: ['HS256'] });
      isAuthenticated = true;
    } catch {
      // Invalid or expired session
      isAuthenticated = false;
    }
  }

  // Redirect authenticated users away from login
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login (for protected routes)
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
