import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import sendResponse from '../../utils/sendResponse';
import { createToken, verifyToken } from './auth.utils';

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid email or password');
  }

  const jwtPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string
  );

  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    process.env.JWT_REFRESH_EXPIRES_IN as string
  );

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      user: userWithoutPassword,
    },
  });
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError(401, 'Refresh token is missing');
  }

  const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError(401, 'User no longer exists');
  }

  const jwtPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token retrieved successfully',
    data: {
      accessToken: newAccessToken,
    },
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const { id } = (req as any).user;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: user,
  });
});

export const AuthController = {
  login,
  refreshToken,
  getMe,
};
