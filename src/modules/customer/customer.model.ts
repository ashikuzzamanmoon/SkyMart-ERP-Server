import { Schema, model } from 'mongoose';
import { ICustomer } from './customer.interface';

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
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

// Filter out deleted customers for find queries
customerSchema.pre('find', function (this: any) {
  this.find({ isDeleted: { $ne: true } });
});

customerSchema.pre('findOne', function (this: any) {
  this.find({ isDeleted: { $ne: true } });
});

customerSchema.pre('aggregate', function (this: any) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Customer = model<ICustomer>('Customer', customerSchema);
