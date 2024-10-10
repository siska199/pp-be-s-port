import CONFIG from "@config";
import { CustomError } from "@middleware/error-handler";
import { User } from "@prisma/client";
import { getUserById } from "@query/user/user-query";
import { TRequestAuthRoute } from "@types";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authentication = (
  req: TRequestAuthRoute,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    jwt.verify(token, CONFIG.SECRET_KEY, async (err, payload) => {
      if (err) throw new CustomError("Invalid Token", 403);

      if (payload && typeof payload === "object" && payload.id_user) {
        const idUser = payload.id_user as string;
        const user = await getUserById(idUser);
        if (!user) throw new CustomError("Invalid Token", 403);
        req.user = user;
        return next();
      }
    });
  }

  throw new CustomError("Unautorized", 401);
};

export default authentication;
