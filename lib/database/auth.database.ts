import type { IDatabase } from '@/lib/services/database.interface'
import type { User } from '@/types/auth.types'

const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    password: '$2a$12$k8Y.hh/K8t2LQv.ef9KyreWd1jF3j5eVEwJx3xGw9h8HWR.gHNzNi', // "password123"
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export class AuthDatabaseService implements IDatabase {
  async findUserByEmail(email: string): Promise<User | null> {
    return mockUsers.find(user => user.email === email) || null
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User | null> {
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      ...userData
    }
    mockUsers.push(newUser)
    return newUser
  }
}
