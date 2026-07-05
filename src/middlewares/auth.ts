import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';

const auth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'You are not logged in! Please log in to get access.');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new AppError(401, 'You are not logged in! Please log in to get access.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as jwt.JwtPayload;
    (req as any).user = decoded as jwt.JwtPayload & { id: string; role: string };
    next();
  } catch (error) {
    throw new AppError(401, 'Invalid token or token has expired.');
  }
});

export default auth;
