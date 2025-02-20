import { authConfig } from '../auth.config'

export class CookieService {
  static createAuthCookie(token: string): string {
    return `${authConfig.cookies.name}=${token}; ${Object.entries(
      authConfig.cookies.options
    )
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')}`
  }

  static createLogoutCookie(): string {
    return `${authConfig.cookies.name}=; Max-Age=0; Path=/`
  }
} 