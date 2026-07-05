import { Document, Types } from 'mongoose';

export interface ISaleItem {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ISale extends Document {
  customer: Types.ObjectId;
  items: ISaleItem[];
  grandTotal: number;
  createdBy: Types.ObjectId;
}
