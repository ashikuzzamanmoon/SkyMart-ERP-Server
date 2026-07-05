import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';

const authorize = (...requiredRoles: TUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = (req as any).user;

    if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(403, 'You do not have permission to perform this action.');
    }

    next();
  };
};

export default authorize;
