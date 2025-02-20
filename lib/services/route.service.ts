import { authConfig } from '../auth.config'

export class RouteService {
  static isPublicPath(pathname: string): boolean {
    return authConfig.publicPages.some(page => {
      if (page.endsWith('/*')) {
        const basePath = page.slice(0, -2)
        return pathname.startsWith(basePath)
      }
      return page === pathname
    })
  }
} 