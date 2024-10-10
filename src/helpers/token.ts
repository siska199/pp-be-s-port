import CONFIG from "@config";
import { TGeneralObject } from "@types";
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

export const generateTimeExpired = (day: number = 1) => {
  return Date.now() + 24 * 60 * 60 * 1000 * day;
};
