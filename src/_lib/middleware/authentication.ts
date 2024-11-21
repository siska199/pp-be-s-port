import { getUserByAnyParamDto } from "@1. dto/1. user/user-dto";
import CONFIG from "@_lib/config";
import { CustomError } from "@_lib/middleware/error-handler";
import { TRequestAuthRoute } from "@_lib/types";
import { User } from "@prisma/client";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const getTokeFromHeader = (authHeader?: string) => {
  const token = authHeader?.split(" ")[1];
  if (!token) throw new CustomError("Unauthorized", 401);
  return token;
};

const verifyToken = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, CONFIG.SECRET_KEY, async (err, payload) => {
      if (err) return reject(new CustomError("Invalid Token", 403));

      if (payload && typeof payload === "object" && payload.id_user) {
        const user = await getUserByAnyParamDto({ id: payload.id_user });
        if (!user) return reject(new CustomError("Invalid Token", 403));

        resolve(user);
      }
    });
  });
};

const authentication = () => {
  return async (req: TRequestAuthRoute, res: Response, next: NextFunction) => {
    try {
      const token = getTokeFromHeader(req.headers.authorization);
      const user = await verifyToken(token as string);
      req.user = user;
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default authentication;
