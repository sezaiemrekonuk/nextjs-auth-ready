import type { IDatabase } from './database.interface'
import type { User } from '../../types/auth.types'

export class MockDatabaseService implements IDatabase {
  async findUserByEmail(email: string): Promise<User | null> {
    return null
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User | null> {
    return null
  }
} 