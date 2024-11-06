import { login, register } from "@2. controllers/1. user/1. auth-controller";
import validateData from "@_lib/middleware/validate-data";
import loginSchema from "@_lib/validation/auth/login-schema";
import registerSchema from "@_lib/validation/auth/register-schema";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", validateData(registerSchema), register);
  router.post("/auth/login", validateData(loginSchema), login);
};
