import jwt from 'jsonwebtoken'
import { authConfig } from './auth.config'
import type { UserDTO } from '../types/auth.types'

export interface TokenPayload extends Pick<UserDTO, 'id' | 'email'> {}

export async function createToken(payload: TokenPayload): Promise<string> {
  return jwt.sign(payload as jwt.JwtPayload, authConfig.jwt.secret as jwt.Secret, {
    expiresIn: authConfig.jwt.expiresIn
  } as jwt.SignOptions)
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  return jwt.verify(token, authConfig.jwt.secret as jwt.Secret) as TokenPayload
} 