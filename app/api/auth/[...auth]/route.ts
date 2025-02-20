import { NextResponse } from 'next/server'
import { setupAuth } from '@/lib/setup'
import { AuthDatabaseService } from '@/lib/database/auth.database'
import { authConfig } from '@/lib/auth.config'

const auth = await setupAuth(authConfig, new AuthDatabaseService())
const authService = new auth.AuthService(auth.database)

export async function POST(request: Request) {
  const { pathname } = new URL(request.url)
  const authPath = pathname.split('/').pop()
  const body = await request.json()

  try {
    switch (authPath) {
      case 'login': {
        const result = await authService.login(body)
        return NextResponse.json(
          { user: result.user },
          {
            headers: {
              'Set-Cookie': auth.CookieService.createAuthCookie(result.token)
            }
          }
        )
      }

      case 'register': {
        const result = await authService.register(body)
        return NextResponse.json(
          { user: result.user },
          {
            status: 201,
            headers: {
              'Set-Cookie': auth.CookieService.createAuthCookie(result.token)
            }
          }
        )
      }

      case 'logout': {
        return NextResponse.json(
          { message: 'Logged out successfully' },
          {
            headers: {
              'Set-Cookie': auth.CookieService.createLogoutCookie()
            }
          }
        )
      }

      default:
        return NextResponse.json({ message: 'Route not found' }, { status: 404 })
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
} 