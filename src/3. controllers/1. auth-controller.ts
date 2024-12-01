import { getUserByAnyParamDto, upsertUserDto } from "@2. dto/1. user-dto";
import catchErrors from "@_lib/helpers/catch-error";
import { dycriptBycrypt, encryptBycrypt } from "@_lib/helpers/encryption";
import { successResponse } from "@_lib/helpers/response";
import { generateTokenJwt } from "@_lib/helpers/token";
import { CustomError } from "@_lib/middleware/error-handler";
import { Request, Response } from "express";

export const signUp = catchErrors(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  await getUserByAnyParamDto({ username, email });

  const hashPassword = await encryptBycrypt(password);

  const result = await upsertUserDto({
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

  const userExist = await getUserByAnyParamDto({ username });
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