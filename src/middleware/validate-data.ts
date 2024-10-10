import { NextFunction, Request, Response } from "express";
import z from "zod";

const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      next(error);
    }
  };
};

export default validateData;
