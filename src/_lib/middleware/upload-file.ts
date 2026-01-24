import uploadFileToCloudinary from "../helpers/claudinary";
import { CustomError } from "../middleware/error-handler";
import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

type TFileValidationRules = {
  types: string[];
  size?: number;
  folder: string;
  maxCount?: number;
};

type TFileRules = Record<string, TFileValidationRules>;

const uploadFile = (fileRules: TFileRules) => {
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

      if (!rules)
        return cb(
          new CustomError(`No validation rules defined for field: ${fieldname}`)
        );

      const { types } = rules;
      const isAllowedType = types
        .map((type) => type.toLowerCase())
        .filter((type) => {
          return file.mimetype.toLowerCase()?.includes(type);
        })[0];

      if (!isAllowedType)
        return cb(
          new CustomError(
            `Invalid file type for ${fieldname}. Allowed types: ${types.join(
              ", "
            )}`
          )
        );
      cb(null, true);
    },
  });
  const listFieldFile = Object.entries(fileRules)?.map(([key, value]) => ({
    name: key,
    maxCount: value?.maxCount,
  }));

  return async (req: Request, res: Response, next: NextFunction) => {
    upload.fields(listFieldFile)(req, res, async (err) => {
      if (err) next(new CustomError(err.message, 400));
      await uploadFileToClaudinary(req, next, fileRules);
    });
  };
};

const uploadFileToClaudinary = async (
  req: Request,
  next: NextFunction,
  fileRules: TFileRules
) => {
  if (!req.files) return next(new CustomError(`No files were uploaded`, 400));

  for (const field in req.files) {
    // @ts-ignore
    const fileArray = req?.files?.[field];
    if (!Array.isArray(fileArray)) return null;
    await Promise.all(
      fileArray?.map?.(async (file, i) => {
        const fileSize = file.buffer.length;
        const rules = fileRules[field];

        if (fileSize > (rules?.size || 5) * 1024 * 1024) {
          next(
            new CustomError(
              `File size exceeds the limit for ${field}. Maximum size is ${rules.size} MB.`,
              400
            )
          );
        }

        const result = await uploadFileToCloudinary(
          file,
          fileRules[field].folder
        );

        if (fileArray?.length > 1 || (fileRules?.[field]?.maxCount||0)>1) {
          req.body[field] = (
            Array.isArray(req.body[field])
              ? req.body[field].concat(result?.public_id)
              : [req.body[field], result?.public_id]
          )?.filter((data) => data);
        } else {
          req.body[field] = result?.public_id;
        }
      })
    );
  }
  next();
};

export default uploadFile;
