import { config } from 'dotenv' 
import { publicConfig } from '../config/auth/auth.public'
import type { AuthConfig } from '../types/auth.types'

// Load environment variables
config()

export const authConfig: AuthConfig = {
  ...publicConfig,
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key-dev-only',
    expiresIn: '1d'
  },
  authProviders: {
    ...publicConfig.authProviders,
    credentials: {
      ...publicConfig.authProviders.credentials,
      loginFields: ['email', 'password']
    },
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    github: {
      enabled: false,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  }
}

export function getPublicConfig() {
  return publicConfig
} 