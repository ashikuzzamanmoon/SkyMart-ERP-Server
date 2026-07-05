import { z } from 'zod';

const saleItemValidationSchema = z.object({
  product: z.string({ message: 'Product ID is required' }),
  quantity: z
    .number({ message: 'Quantity must be a valid number' })
    .min(1, 'Quantity must be at least 1'),
});

export const createSaleSchema = z.object({
  body: z.object({
    customer: z.string({ message: 'Customer ID is required' }),
    items: z
      .array(saleItemValidationSchema, { message: 'Items must be an array' })
      .min(1, 'Sale must contain at least one item'),
  }),
});

export const SaleValidations = {
  createSaleSchema,
};
