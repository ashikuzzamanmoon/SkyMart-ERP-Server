import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import auth from '../../middlewares/auth';
import authorize from '../../middlewares/authorize';
import upload from '../../middlewares/upload';

const router = express.Router();

router.post(
  '/',
  auth,
  authorize('admin', 'manager'),
  upload.single('image'),
  (req, res, next) => {
    // Parse numeric fields from form-data so Zod can validate them properly
    // Multer sends everything in req.body as strings
    if (req.body.purchasePrice) req.body.purchasePrice = Number(req.body.purchasePrice);
    if (req.body.sellingPrice) req.body.sellingPrice = Number(req.body.sellingPrice);
    if (req.body.stockQuantity) req.body.stockQuantity = Number(req.body.stockQuantity);
    next();
  },
  validateRequest(ProductValidations.createProductSchema),
  ProductControllers.createProduct
);

router.get(
  '/',
  auth,
  authorize('admin', 'manager', 'employee'),
  ProductControllers.getAllProducts
);

router.get(
  '/:id',
  auth,
  authorize('admin', 'manager', 'employee'),
  ProductControllers.getProductById
);

router.patch(
  '/:id',
  auth,
  authorize('admin', 'manager'),
  upload.single('image'),
  (req, res, next) => {
    if (req.body.purchasePrice) req.body.purchasePrice = Number(req.body.purchasePrice);
    if (req.body.sellingPrice) req.body.sellingPrice = Number(req.body.sellingPrice);
    if (req.body.stockQuantity) req.body.stockQuantity = Number(req.body.stockQuantity);
    next();
  },
  validateRequest(ProductValidations.updateProductSchema),
  ProductControllers.updateProduct
);

router.delete(
  '/:id',
  auth,
  authorize('admin', 'manager'),
  ProductControllers.deleteProduct
);

export const ProductRoutes = router;
