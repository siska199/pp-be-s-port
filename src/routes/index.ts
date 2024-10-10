import authRoute from "@routes/auth/auth-route";
import express from "express";
const router = express.Router();

export default () => {
  authRoute(router);
  return router;
};
