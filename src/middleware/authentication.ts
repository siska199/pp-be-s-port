import CONFIG from "@config";
import { CustomError } from "@middleware/error-handler";
import { User } from "@prisma/client";
import { getUserById } from "@query/user/user-query";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TRequestCustome extends Request {
  user: User;
}

const authentication = (
  req: TRequestCustome,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader?.split(" ")[1];
    jwt.verify(
      token,
      CONFIG.SECRET_KEY,
      async (err, payload) => {
        if (err) throw new CustomError("Invalid Token", 403);
        const idUser = payload?.id_user;
        const user = await getUserById(idUser);
        req.user = payload;
      }
    );
  }

  throw new CustomError("Unautorized", 401);
};

export default authentication;
