import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')
  console.log('Current path:', request.nextUrl.pathname)
  console.log('Token present:', !!token)

  const protectedPaths = ['/dashboard']
  const currentPath = request.nextUrl.pathname
  const isProtectedPath = protectedPaths.some(path => currentPath.startsWith(path))

  if (token && (currentPath === '/login' || currentPath === '/register')) {
    console.log('Redirecting to dashboard from login/register')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if(!token){
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (isProtectedPath && token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      });
      
      const data = await response.json();
      console.log('Token validation response:', data);

      if (!data.isValid) {
        console.log('Token invalid, redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      console.log('Error validating token:', error);
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',

  ]
}