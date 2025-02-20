import type { IDatabase } from '@/lib/services/database.interface'
import type { AuthConfig } from '@/types/auth.types'

export async function setupAuth(config: Partial<AuthConfig>, database: IDatabase) {
  return {
    middleware: (await import('../middleware/auth')).middleware,
    AuthService: (await import('./services/auth.service')).AuthService,
    CookieService: (await import('./services/cookie.service')).CookieService,
    database
  }
} 