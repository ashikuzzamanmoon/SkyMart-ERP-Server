import mongoose from 'mongoose';
import QueryBuilder from '../../utils/QueryBuilder';
import { ISale } from './sale.interface';
import { Sale } from './sale.model';
import { Product } from '../product/product.model';
import AppError from '../../errors/AppError';

const createSale = async (payload: Partial<ISale>) => {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    let grandTotal = 0;
    const items = payload.items || [];
    const processedItems = [];

    for (const item of items) {
      // Fetch product inside the transaction
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new AppError(404, `Product with ID ${item.product} not found`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new AppError(400, `Insufficient stock for product ${product.name}`);
      }

      // Compute calculations securely
      const unitPrice = product.sellingPrice;
      const subtotal = unitPrice * item.quantity;
      grandTotal += subtotal;

      processedItems.push({
        product: item.product,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      });

      // Deduct stock quantity safely within the session
      product.stockQuantity -= item.quantity;
      await product.save({ session });
    }

    // Create the Sale document within the session
    const [newSale] = await Sale.create(
      [
        {
          customer: payload.customer,
          items: processedItems,
          grandTotal,
          createdBy: payload.createdBy,
        },
      ],
      { session }
    );

    if (!newSale) {
      throw new AppError(400, 'Failed to create sale');
    }

    await session.commitTransaction();

    // Populate and return the newly created sale
    const populatedSale = await Sale.findById(newSale._id)
      .populate('customer', 'name phone')
      .populate('items.product', 'name sku category')
      .populate('createdBy', 'name email role');

    return populatedSale;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getAllSales = async (query: Record<string, unknown>) => {
  const saleQuery = new QueryBuilder(
    Sale.find()
      .populate('customer', 'name phone')
      .populate('items.product', 'name sku sellingPrice')
      .populate('createdBy', 'name role'),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await saleQuery.countTotal();
  const result = await saleQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSaleById = async (id: string) => {
  const result = await Sale.findById(id)
    .populate('customer', 'name phone email address')
    .populate('items.product', 'name sku sellingPrice image category')
    .populate('createdBy', 'name email role');

  return result;
};

export const SaleServices = {
  createSale,
  getAllSales,
  getSaleById,
};
