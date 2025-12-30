import prisma from "../_db/prisma";
import { getUserByAnyParamService, upsertUserService } from "../2. service/1. user-service";
import { upsertBulkSocialLinkService } from "../2. service/3. social-link-service";
import catchErrors from "../_lib/helpers/catch-error";
import { dycriptBycrypt, encryptBycrypt } from "../_lib/helpers/encryption";
import { successResponse } from "../_lib/helpers/response";
import { generateTokenJwt } from "../_lib/helpers/token";
import { CustomError } from "../_lib/middleware/error-handler";
import { Request, Response } from "express";

export const signUp = catchErrors(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExist = await getUserByAnyParamService({ username, email });
  if (userExist?.id)
    throw new CustomError(
      `This ${
        userExist?.username === username ? "Username" : "Email"
      } has been used`
    );

  const hashPassword = await encryptBycrypt(password);

  const result = await upsertUserService({
    ...req.body,
    password: hashPassword,
  });


  successResponse({
    res,
    message: "Successfully Created User",
    data: result,
  });
});

export const signIn = catchErrors(async (req, res) => {
  const { username, password } = req.body;

  const userExist = await getUserByAnyParamService({ username });
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
