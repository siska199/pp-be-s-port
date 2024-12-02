import { getUserByAnyParamDto } from "@2. dto/1. user-dto";
import CONFIG from "@_lib/config";
import { CustomError } from "@_lib/middleware/error-handler";
import { TRequestAuthRoute } from "@_lib/types";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const getTokeFromHeader = (authHeader?: string) => {
  const token = authHeader?.split(" ")[1];
  if (!token) throw new CustomError("Unauthorized", 401);
  return token;
};

const verifyToken = async (token: string) => {
  try {
    const decryptedToken = jwt.verify(token, CONFIG.SECRET_KEY) as any;
    const user = await getUserByAnyParamDto({ id: decryptedToken.id_user });
    return user;
  } catch (error) {
    throw new CustomError("Token has been expired", 403);
  }
};

const authentication = () => {
  return async (req: TRequestAuthRoute, res: Response, next: NextFunction) => {
    try {
      const token = getTokeFromHeader(req.headers.authorization);
      const user = await verifyToken(token as string);
      //@ts-ignore
      req.user = user;
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default authentication;
