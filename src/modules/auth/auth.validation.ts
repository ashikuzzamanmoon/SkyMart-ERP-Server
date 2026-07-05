import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password cannot be empty'),
  }),
});
