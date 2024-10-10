import authRoute from "@routes/auth/auth-route";
import professionRoute from "@routes/profession/profession-route";
import express from "express";
const router = express.Router();

export default () => {
  authRoute(router);
  professionRoute(router);
  return router;
};
