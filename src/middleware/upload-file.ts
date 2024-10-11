import uploadFileToCloudinary from "@helpers/claudinary";
import { CustomError } from "@middleware/error-handler";
import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

type TFileValidationRules = {
  types: string[];
  size: number;
  mandatory?: boolean;
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
          new Error(`No validation rules defined for field: ${fieldname}`)
        );
      }

      const { types } = rules;
      const isAllowedType = types
        .map((type) => type.toLowerCase())
        .includes(file.mimetype.toLowerCase());
      if (!isAllowedType) {
        return cb(
          new Error(
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

            if (fileSize > rules.size * 1024 * 1024)
              next(
                new CustomError(
                  `File size exceeds the limit for ${field}. Maximum size is ${rules.size} MB.`,
                  400
                )
              );
            const result = await uploadFileToCloudinary(file);
            req.body[field] = result;
            uploadResults[field] = uploadResults[field] || [];
            uploadResults[field].push(result);
          }
        }
      }
    });
  };
};

export default upload;
