import express from 'express';
import { CustomerControllers } from './customer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidations } from './customer.validation';
import auth from '../../middlewares/auth';
import authorize from '../../middlewares/authorize';

const router = express.Router();

router.post(
  '/',
  auth,
  authorize('admin', 'manager'),
  validateRequest(CustomerValidations.createCustomerSchema),
  CustomerControllers.createCustomer
);

router.get(
  '/',
  auth,
  authorize('admin', 'manager', 'employee'),
  CustomerControllers.getAllCustomers
);

router.get(
  '/:id',
  auth,
  authorize('admin', 'manager', 'employee'),
  CustomerControllers.getCustomerById
);

router.patch(
  '/:id',
  auth,
  authorize('admin', 'manager'),
  validateRequest(CustomerValidations.updateCustomerSchema),
  CustomerControllers.updateCustomer
);

router.delete(
  '/:id',
  auth,
  authorize('admin', 'manager'),
  CustomerControllers.deleteCustomer
);

export const CustomerRoutes = router;
