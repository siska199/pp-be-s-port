
import CONFIG from "@_lib/config";
import { TGeneralObject } from "@_lib/types";
import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenJwt = (payload: TGeneralObject) => {
  if (!CONFIG.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
  }

  const secretKey: jwt.Secret = CONFIG.SECRET_KEY;

  const options: SignOptions = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secretKey, options);
};
