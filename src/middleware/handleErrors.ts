import * as express from 'express';
import { Request, Response } from 'express';
import { logger } from '../utils/Logger';
import { ApiError } from '../utils/errors';

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
): void => {
  let statusCode = 500;
  let message;
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    logger.error(err);
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
