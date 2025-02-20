export interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface UserDTO extends Omit<User, 'password'> {}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
}

export interface AuthResponse {
  user: UserDTO
  token: string
}

export interface AuthConfig {
  authProviders: {
    credentials: {
      enabled: boolean
      loginFields: string[]
    }
    google: {
      enabled: boolean
      clientId?: string
      clientSecret?: string
    }
    github: {
      enabled: boolean
      clientId?: string
      clientSecret?: string
    }
  }
  jwt: {
    secret: string
    expiresIn: string
  }
  cookies: {
    name: string
    options: {
      httpOnly: boolean
      secure: boolean
      sameSite: 'lax' | 'strict' | 'none'
      path: string
    }
  }
  publicPages: string[]
} 