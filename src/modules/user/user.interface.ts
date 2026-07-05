import { Model } from 'mongoose';

export type TUserRole = 'admin' | 'manager' | 'employee';

export interface IUser {
  name: string;
  email: string;
  password?: string; // Optional because we might exclude it in queries
  role: TUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
