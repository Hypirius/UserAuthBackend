import type { Request, Response } from 'express';
import ApiError from '../utils/ApiErrorClass.js';

function globalErrorHandler(err: unknown, _: Request, res: Response) {
  const errorObj =
    err instanceof ApiError
      ? err
      : new ApiError(
          500,
          'Internal Server error',
          'Something went wrong within the server, please contact administrator'
        );

  res.status(errorObj.statusCode).json(err);
}

export default globalErrorHandler;
