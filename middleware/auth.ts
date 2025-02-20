import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '../lib/jwt'
import { authConfig } from '../lib/auth.config'
import { RouteService } from '../lib/services/route.service'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(authConfig.cookies.name)
  const pathname = request.nextUrl.pathname

  if (RouteService.isPublicPath(pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  try {
    await verifyToken(token.value)
    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete(authConfig.cookies.name)
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)']
} 