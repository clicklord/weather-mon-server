import { Response } from 'express';

class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class NotFoundError extends ApiError {
  statusCode: number;
  constructor(message: string) {
    super(404, message);
  }
}

class BadRequest extends ApiError {
  statusCode: number;
  constructor(message: string) {
    super(400, message);
  }
}

class InternalError extends ApiError {
  statusCode: number;
  constructor(message: string) {
    super(500, message);
  }
}

const handleError = (err: ApiError, res: Response): void => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

export { ApiError, NotFoundError, BadRequest, InternalError, handleError };
