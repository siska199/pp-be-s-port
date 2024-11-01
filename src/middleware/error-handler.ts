import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

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
  if (error instanceof Prisma.PrismaClientValidationError) {
    error.message = handlePrismaErrorMessage(error);
  }
  res.status(code).send({
    status: false,
    message: error.message,
  });
};

const handlePrismaErrorMessage = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        const field = error?.meta?.target;
        return `There is a unique constraint violation, ${field} should be unique but already exists.`;
      case "P2025":
        return `Record not found for the requested query.`;
      default:
        return `An error occurred: ${error.message}`;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return `Validation failed: ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return `Prisma failed to initialize: ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return `The Prisma engine has panicked: ${error.message}`;
  } else {
    return error.message;
  }
};

export default errorHandler;
