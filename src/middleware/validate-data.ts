import { NextFunction, Request, Response } from "express";
import z from "zod";

const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

export default validateData;
