import { compare, hash } from 'bcryptjs'
import { createToken } from './jwt'
import type { 
  User, 
  UserDTO, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '../types/auth.types'

export class AuthService {
  async login({ email, password }: LoginCredentials): Promise<AuthResponse> {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    const user = await this.findUserByEmail(email)
    
    if (!user) {
      throw new Error('User not found')
    }

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }


    const token = await createToken({
      id: user.id,
      email: user.email,
    })

    return { token, user: this.sanitizeUser(user) }
  }

  async register({ email, password, name }: RegisterData): Promise<AuthResponse> {
    const existingUser = await this.findUserByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 12)
    
    const user = await this.createUser({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    if (!user) {
      throw new Error('Failed to create user')
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
    })

    return { token, user: this.sanitizeUser(user) }
  }

  private sanitizeUser(user: User): UserDTO {
    const { password, ...sanitizedUser } = user
    return sanitizedUser
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return null
  }

  private async createUser(userData: Omit<User, 'id'>): Promise<User | null> {
    return null
  }
} 