import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export { default } from "next-auth/middleware"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  const publicRoutes = ['/', '/login', '/signup']
  
  if (token && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!token && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

}
 
// See "Matching Paths" below to learn more 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
  ]
}