import { register } from "@controllers/auth/auth-controller";
import express from "express";

export default (router: express.Router) => {
  console.log("come here");
  router.post("/auth/register", register);
};
