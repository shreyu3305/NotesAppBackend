import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { IUser } from '../users/model.js';

export interface TokenPayload {
  userId: string;
  email: string;
}

export const signAccessToken = (user: IUser): string => {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TTL,
    issuer: 'notesapp',
    audience: 'notesapp-client'
  } as jwt.SignOptions);
};

export const signRefreshToken = (user: IUser): string => {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TTL,
    issuer: 'notesapp',
    audience: 'notesapp-client'
  } as jwt.SignOptions);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: 'notesapp',
      audience: 'notesapp-client'
    }) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: 'notesapp',
      audience: 'notesapp-client'
    }) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
