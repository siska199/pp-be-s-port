import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  SERVER_PORT: process.env.SERVER_PORT as string,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
  CLAUDINARY_CLOUD_NAME: process.env.CLAUDINARY_CLOUD_NAME,
  CLAUDINARY_API_KEY: process.env.CLAUDINARY_API_KEY,
  CLAUDINARY_API_SECRET: process.env.CLAUDINARY_API_SECRET,
  API_REGION: process.env.API_REGION as string,
  API_POSTCODE_ID : process.env.API_POSTCODE_ID as string
};

export default CONFIG;
