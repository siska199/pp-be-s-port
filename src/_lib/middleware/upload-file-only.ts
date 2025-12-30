import multer from "multer";
import { Request, Response, NextFunction } from "express";
import uploadFileToCloudinary from "../helpers/claudinary";
import { CustomError } from "../middleware/error-handler";

const MAX_FILE_SIZE_MB = 10;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
  },
}).single("file");

export const uploadSingleFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, async (err) => {
    if (err) return next(new CustomError(err.message, 400));

    const { folder } = req.body;

    if (!folder || typeof folder !== "string") {
      return next(new CustomError("Folder is required", 400));
    }

    if (!req.file) {
      return next(new CustomError("File is required", 400));
    }

    try {
      const result = await uploadFileToCloudinary(
        req.file,
        folder
      );

      req.body.public_id = result.public_id;
      next();
    } catch (error) {
      next(error);
    }
  });
};
