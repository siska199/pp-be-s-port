import validationParse from "@_lib/helpers/validation-parse";
import { CustomError } from "@_lib/middleware/error-handler";
import { NextFunction, Request, Response } from "express";
import z from "zod";

const validateData = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validationParse({ schema, data: req.body });
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

export default validateData;
