export const publicConfig = {
  authProviders: {
    credentials: {
      enabled: true,
      loginFields: ['email', 'password']
    },
    google: {
      enabled: true
    },
    github: {
      enabled: false
    }
  },
  cookies: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax' as const,
      path: '/'
    }
  },
  publicPages: [
    '/login',
    '/register',
    '/api/auth/*'
  ] as string[]
} as const 