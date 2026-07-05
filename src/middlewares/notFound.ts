import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    errorDetails: {
      path: req.originalUrl,
      message: `The requested URL was not found on this server.`,
    },
  });
};

export default notFound;
