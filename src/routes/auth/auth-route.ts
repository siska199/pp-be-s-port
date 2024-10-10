import { login, register } from "@controllers/auth/auth-controller";
import validateData from "@middleware/validate-data";
import loginSchema from "@validation/auth/login-schema";
import registerSchema from "@validation/auth/register-schema";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", validateData(registerSchema), register);
  router.post("/auth/login", validateData(loginSchema), login);
};
