import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password by default
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

userSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password') || !this.password) return;
  
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method('comparePassword', async function (candidate: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
});

export const User = model<IUser, UserModel>('User', userSchema);
