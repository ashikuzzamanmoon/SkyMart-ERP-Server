import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app: Application = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

import { AuthRoutes } from './modules/auth/auth.route';
import { ProductRoutes } from './modules/product/product.route';
import { CustomerRoutes } from './modules/customer/customer.route';

// Mount routes here (e.g., app.use('/api/v1/users', userRoutes))
app.use('/api/auth', AuthRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/customers', CustomerRoutes);
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
