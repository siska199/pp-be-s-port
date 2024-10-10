import { ErrorRequestHandler } from "express";
export class CustomError extends Error {
  public statusCode: number;

  constructor(message: any, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let code = error.statusCode || 500;

  res.status(code).send({
    status: false,
    message: error.message,
  });
};

export default errorHandler;
