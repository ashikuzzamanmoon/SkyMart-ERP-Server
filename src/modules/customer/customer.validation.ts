import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Customer name is required' }),
    phone: z.string({ message: 'Phone number is required' }),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    address: z.string().optional(),
  }),
});

export const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    address: z.string().optional(),
  }),
});

export const CustomerValidations = {
  createCustomerSchema,
  updateCustomerSchema,
};
