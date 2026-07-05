import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CustomerServices } from './customer.service';
import AppError from '../../errors/AppError';

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerServices.createCustomer(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Customer created successfully',
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await CustomerServices.getAllCustomers(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Customers retrieved successfully',
    meta,
    data: result,
  });
});

const getCustomerById = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerServices.getCustomerById(req.params.id as string);

  if (!result) {
    throw new AppError(404, 'Customer not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Customer retrieved successfully',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerServices.updateCustomer(req.params.id as string, req.body);

  if (!result) {
    throw new AppError(404, 'Customer not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Customer updated successfully',
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerServices.deleteCustomer(req.params.id as string);

  if (!result) {
    throw new AppError(404, 'Customer not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Customer deleted successfully',
    data: result,
  });
});

export const CustomerControllers = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
