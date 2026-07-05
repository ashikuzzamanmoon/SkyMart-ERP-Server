import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';
import AppError from '../../errors/AppError';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  if (!(req as any).file) {
    throw new AppError(400, 'Product image is required');
  }

  const payload = {
    ...req.body,
    image: (req as any).file.path, // Cloudinary URL is in req.file.path
  };

  const result = await ProductServices.createProduct(payload);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ProductServices.getAllProducts(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    meta,
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getProductById(req.params.id as string);

  if (!result) {
    throw new AppError(404, 'Product not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };

  // If a new image was uploaded, overwrite the old image URL in the payload
  if ((req as any).file) {
    payload.image = (req as any).file.path;
  }

  const result = await ProductServices.updateProduct(req.params.id as string, payload);

  if (!result) {
    throw new AppError(404, 'Product not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.deleteProduct(req.params.id as string);

  if (!result) {
    throw new AppError(404, 'Product not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
