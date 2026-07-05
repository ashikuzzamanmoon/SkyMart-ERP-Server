import { Schema, model, Query, Aggregate } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    purchasePrice: {
      type: Number,
      required: [true, 'Purchase price is required'],
      min: [0, 'Purchase price cannot be negative'],
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Selling price cannot be negative'],
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock quantity cannot be negative'],
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Filter out deleted products for find queries
productSchema.pre('find', function (this: any) {
  this.find({ isDeleted: { $ne: true } });
});

productSchema.pre('findOne', function (this: any) {
  this.find({ isDeleted: { $ne: true } });
});

productSchema.pre('aggregate', function (this: any) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Product = model<IProduct>('Product', productSchema);
