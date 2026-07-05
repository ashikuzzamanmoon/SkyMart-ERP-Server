import { Schema, model } from 'mongoose';
import { ISale, ISaleItem } from './sale.interface';

const saleItemSchema = new Schema<ISaleItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
});

const saleSchema = new Schema<ISale>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    items: {
      type: [saleItemSchema],
      required: true,
      validate: {
        validator: function (items: ISaleItem[]) {
          return items && items.length > 0;
        },
        message: 'Sale must contain at least one item',
      },
    },
    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Sale = model<ISale>('Sale', saleSchema);
