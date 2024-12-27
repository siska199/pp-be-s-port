import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  SERVER_PORT: process.env.SERVER_PORT as string,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
  CLAUDINARY_CLOUD_NAME: process.env.CLAUDINARY_CLOUD_NAME,
  CLAUDINARY_API_KEY: process.env.CLAUDINARY_API_KEY,
  CLAUDINARY_API_SECRET: process.env.CLAUDINARY_API_SECRET,
  EMAIL_ADMIN_S_PORT: process.env.EMAIL_ADMIN_S_PORT as string,
  PASSWORD_ADMIN_S_PORT: process.env.PASSWORD_ADMIN_S_PORT as string,
  DB_NAME: process.env.POSTGRES_DB as string,
  FOLDER_FILE_NAME: {
    COMPANY: "company",
    CATEGORY_SOCIAL_LINK: "category-social-link",
    EDUCATION_SCHOOL: "education_school",
    SKILL: "skill",
  },
};

export default CONFIG;
