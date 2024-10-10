import prisma from "@db/prisma";
import catchErrors from "@helpers/catch-error";
import { dycriptBycrypt, encryptBycrypt } from "@helpers/encryption";
import { successResponse } from "@helpers/response";
import {
  generateTimeExpired,
  generateToken,
  generateTokenJwt,
} from "@helpers/token";
import { CustomError } from "@middleware/error-handler";

export const register = catchErrors(async (req, res) => {
  const { email, password, profession } = req.body;

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) throw new CustomError("This email already has been used", 400);

  const hashPassword = encryptBycrypt(password);
  const verifiedToken = generateToken();
  const expiredVerifiedToken = generateTimeExpired();

  const userCreate = await prisma.user.create({
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

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isPasswordValid = await dycriptBycrypt({
    encryptData: userExist?.password as string,
    unEncryptData: password,
  });

  if (!userExist || !isPasswordValid)
    throw new CustomError("Invalid Credentials", 400);

  const tokenJwtAuth = generateTokenJwt({
    id_user: userExist.id,
  });

  successResponse({
    res,
    code: 200,
    message: "Successfully login",
    data: {
      ...userExist,
      password: undefined,
      token: tokenJwtAuth,
    },
  });
});
