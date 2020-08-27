import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  approved: boolean;
}
export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is Missing', 404);
  }
  // Bearer / Token
  const [, token] = authHeader.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);

  const { sub, approved } = decoded as ITokenPayload;

  if (!approved) {
    throw new AppError('You have no permission to acess the sistem', 401);
  }

  try {
    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('JWT Token is Invalid', 401);
  }
}
