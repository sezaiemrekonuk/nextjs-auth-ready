import type { User } from '../../types/auth.types'

export interface IDatabase {
  findUserByEmail(email: string): Promise<User | null>
  createUser(userData: Omit<User, 'id'>): Promise<User | null>
} 