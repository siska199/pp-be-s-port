import { createUserDto, getUserBy_Dto } from "@3. dto/1. user/user-dto";
import catchErrors from "@_lib/helpers/catch-error";
import { dycriptBycrypt, encryptBycrypt } from "@_lib/helpers/encryption";
import { successResponse } from "@_lib/helpers/response";
import { generateTokenJwt } from "@_lib/helpers/token";
import { CustomError } from "@_lib/middleware/error-handler";
import { Request, Response } from "express";

export const register = catchErrors(async (req: Request, res: Response) => {
  const { email, password, ..._ } = req.body;

  const userExist = await getUserBy_Dto({ email });

  if (userExist) throw new CustomError("This email already has been used", 400);

  const hashPassword = await encryptBycrypt(password);

  const userCreate = await createUserDto({
    ...req.body,
    password: hashPassword,
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
