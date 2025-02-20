import { setupAuth } from '@your-name/next-auth'
import { MyDatabaseService } from '../../../lib/database'
import authConfig from '../../../config/auth.config'

const { AuthService, CookieService } = await setupAuth(authConfig, new MyDatabaseService())

// Use the services in your route handlers 