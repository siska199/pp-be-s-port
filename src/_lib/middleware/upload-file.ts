import uploadFileToCloudinary from "@_lib/helpers/claudinary";
import { CustomError } from "@_lib/middleware/error-handler";
import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

type TFileValidationRules = {
  types: string[];
  size?: number;
  folder?: string;
};

type TFileRules = Record<string, TFileValidationRules>;

const upload = (fileRules: TFileRules) => {
  const storage = multer.memoryStorage();

  const upload = multer({
    storage,
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      const { fieldname } = file;
      const rules = fileRules[fieldname];

      if (!rules) {
        return cb(
          new CustomError(`No validation rules defined for field: ${fieldname}`)
        );
      }

      const { types } = rules;
      const isAllowedType = types
        .map((type) => type.toLowerCase())
        .filter((type) => {
          return file.mimetype.toLowerCase()?.includes(type);
        })[0];

      if (!isAllowedType) {
        return cb(
          new CustomError(
            `Invalid file type for ${fieldname}. Allowed types: ${types.join(
              ", "
            )}`
          )
        );
      }
      cb(null, true);
    },
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    upload.fields(
      Object.keys(fileRules).map((field) => ({
        name: field,
        maxCount: 1,
      }))
    )(req, res, async (err) => {
      if (err) next(new CustomError(err.message, 400));
      const uploadResults: Record<string, any> = {};

      for (const field in req.files) {
        //@ts-ignore
        const fileArray = req.files[field] as Express.Multer.File[];

        if (fileArray && fileArray.length > 0) {
          for (const file of fileArray) {
            const fileSize = file.buffer.length;
            const rules = fileRules[field];

            if (fileSize > (rules?.size || 5) * 1024 * 1024)
              next(
                new CustomError(
                  `File size exceeds the limit for ${field}. Maximum size is ${rules.size} MB.`,
                  400
                )
              );
            const result = await uploadFileToCloudinary(
              file,
              fileRules[field].folder
            );
            req.body[field] = result?.public_id;
            uploadResults[field] = uploadResults[field] || [];
            uploadResults[field].push(result);
          }
        }
      }
      next();
    });
  };
};

export default upload;
