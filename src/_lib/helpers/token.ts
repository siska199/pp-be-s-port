
import CONFIG from "@_lib/config";
import { TGeneralObject } from "@_lib/types";
import jwt from "jsonwebtoken";

export const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenJwt = (payload: TGeneralObject) => {
  const secretKey = CONFIG.SECRET_KEY;
  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

