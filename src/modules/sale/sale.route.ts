import express from 'express';
import { SaleControllers } from './sale.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SaleValidations } from './sale.validation';
import auth from '../../middlewares/auth';
import authorize from '../../middlewares/authorize';

const router = express.Router();

router.post(
  '/',
  auth,
  authorize('admin', 'manager', 'employee'),
  validateRequest(SaleValidations.createSaleSchema),
  SaleControllers.createSale
);

router.get(
  '/',
  auth,
  authorize('admin', 'manager', 'employee'),
  SaleControllers.getAllSales
);

router.get(
  '/:id',
  auth,
  authorize('admin', 'manager', 'employee'),
  SaleControllers.getSaleById
);

export const SaleRoutes = router;
