import { Request, Response, NextFunction } from "express";
import { CustomError } from "../middleware/error-handler";
import { deleteFromCloudinary } from "@_lib/helpers/claudinary";

export const deleteFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { public_id } = req.body;

  if (!public_id || typeof public_id !== "string") {
    return next(new CustomError("public_id is required", 400));
  }

  try {
    const result = await deleteFromCloudinary({publicId:public_id});


    next();
  } catch (error) {
    next(error);
  }
};