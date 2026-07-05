import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: any = err;

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = err.errors;
  }
  // Handle Mongoose CastError (Invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    errorDetails = err;
  }
  // Handle Mongoose Duplicate Key Error
  else if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue)[0];
    message = `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists`;
    errorDetails = err.keyValue;
  }
  // Handle JWT Errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
    errorDetails = err;
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your token has expired. Please log in again.';
    errorDetails = err;
  }
  // Handle custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err;
  }
  // Generic Error Fallback
  else if (err instanceof Error) {
    message = err.message;
    errorDetails = err;
  }

  // Response object
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack,
  });
};

export default globalErrorHandler;
