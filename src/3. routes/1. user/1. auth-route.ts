import { signIn, signUp } from "@4. controllers/1. user/1. auth-controller";

import express from "express";

export default (router: express.Router) => {
  router.post("/auth/sign-up", signUp);
  router.post("/auth/sign-in", signIn);
};
