import CryptoJS from "crypto-js";
import CONFIG from "../config";
import bcrypt from "bcryptjs";

export const encryptDataCryptoJS = (params: {
  data: string;
  secretKey: string;
}) => {
  const { data, secretKey = CONFIG.SECRET_KEY } = params;
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptDataCryptoJS = (params: {
  encryptedData: string;
  secretKey?: string;
}) => {
  const { encryptedData, secretKey = CONFIG.SECRET_KEY } = params;
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptBycrypt = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data, salt);
  return hashedPassword;
};

export const dycriptBycrypt = async (params: {
  encryptData: string;
  unEncryptData: string;
}) => {
  const { encryptData, unEncryptData } = params;
  try {
    const isDataValid = await bcrypt.compare(unEncryptData, encryptData);

    return isDataValid;
  } catch (error) {
    throw new Error("Invalid Encryption Data");
  }
};
