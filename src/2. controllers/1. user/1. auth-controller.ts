import prisma from "@_lib/db/prisma";
import catchErrors from "@_lib/helpers/catch-error";
import { CustomError } from "@_lib/middleware/error-handler";
import { Request, Response } from "express";
import { createUserDto, getUserBy_Dto } from "../../3. dto/1. user/user-dto";
import { dycriptBycrypt, encryptBycrypt } from "@_lib/helpers/encryption";
import { generateToken, generateTokenJwt } from "@_lib/helpers/token";
import { generateTimeExpired } from "@_lib/helpers/function";
import { successResponse } from "@_lib/helpers/response";

export interface TPayloadRegister {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  id_profession: string;
}

export const register = catchErrors(async (req: Request, res: Response) => {
  const { email, password, ...payload } = req.body as TPayloadRegister;

  const userExist = await getUserBy_Dto({ email });

  if (userExist) throw new CustomError("This email already has been used", 400);

  const hashPassword = await encryptBycrypt(password);
  const verifiedToken = generateToken();
  const expiredVerifiedToken = generateTimeExpired();

  const userCreate = await createUserDto({
    ...req.body,
    password: hashPassword,
    verified_token: verifiedToken,
    expired_verified_token: expiredVerifiedToken,
  });

  successResponse({
    res,
    message: "Successfully Created User",
    data: {
      ...userCreate,
      password: undefined,
    },
  });
});

export const login = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await getUserBy_Dto({ email });

  const isPasswordValid = await dycriptBycrypt({
    encryptData: userExist?.password as string,
    unEncryptData: password,
  });

  if (!userExist || !isPasswordValid)
    throw new CustomError("Invalid Credentials", 400);

  const token = generateTokenJwt({
    id_user: userExist.id,
  });

  successResponse({
    res,
    code: 200,
    message: "Successfully login",
    data: {
      ...userExist,
      password: undefined,
      token,
    },
  });
});
