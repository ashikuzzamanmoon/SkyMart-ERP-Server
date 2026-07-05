import express from 'express';
import { DashboardControllers } from './dashboard.controller';
import auth from '../../middlewares/auth';
import authorize from '../../middlewares/authorize';

const router = express.Router();

router.get(
  '/stats',
  auth,
  authorize('admin', 'manager'),
  DashboardControllers.getDashboardStats
);

export const DashboardRoutes = router;
