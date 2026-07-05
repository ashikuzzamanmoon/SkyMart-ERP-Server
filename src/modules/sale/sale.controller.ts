import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SaleServices } from './sale.service';
import AppError from '../../errors/AppError';

const createSale = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    createdBy: (req as any).user.id,
  };

  const result = await SaleServices.createSale(payload);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Sale completed successfully',
    data: result,
  });
});

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await SaleServices.getAllSales(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Sales retrieved successfully',
    meta,
    data: result,
  });
});

const getSaleById = catchAsync(async (req: Request, res: Response) => {
  const result = await SaleServices.getSaleById(req.params.id as string);

  if (!result) {
    throw new AppError(404, 'Sale not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Sale retrieved successfully',
    data: result,
  });
});

export const SaleControllers = {
  createSale,
  getAllSales,
  getSaleById,
};
