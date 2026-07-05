import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { DashboardServices } from './dashboard.service';

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardServices.getDashboardStats();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Dashboard statistics retrieved successfully',
    data: result,
  });
});

export const DashboardControllers = {
  getDashboardStats,
};
