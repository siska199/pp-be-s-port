import { Request, Response, NextFunction } from "express"

export const validateRequiredQueryPortofolio =
  (requiredKeys: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    for (const key of requiredKeys) {
      const value = req.query[key]

      if (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
      ) {
        return res.status(400).json({
          message: `${key} is required`,
        })
      }

      req.query[key] = value.toString().trim()
    }

    next()
  }
