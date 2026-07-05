import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product name is required' }),
    sku: z.string({ message: 'SKU is required' }),
    category: z.string({ message: 'Category is required' }),
    purchasePrice: z.coerce
      .number({ message: 'Purchase price must be a valid number' })
      .min(0, 'Purchase price cannot be negative'),
    sellingPrice: z.coerce
      .number({ message: 'Selling price must be a valid number' })
      .min(0, 'Selling price cannot be negative'),
    stockQuantity: z.coerce
      .number({ message: 'Stock quantity must be a valid number' })
      .min(0, 'Stock quantity cannot be negative')
      .default(0),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    purchasePrice: z.coerce.number().min(0).optional(),
    sellingPrice: z.coerce.number().min(0).optional(),
    stockQuantity: z.coerce.number().min(0).optional(),
  }),
});

export const ProductValidations = {
  createProductSchema,
  updateProductSchema,
};
