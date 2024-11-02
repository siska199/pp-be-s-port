import masterCompanyRoute from "@1. routes/0.1 master-company/0. master-company-route";
import authRoute from "@1. routes/1. user/1. auth-route";
import express from "express";

const router = express.Router();
export default () => {
  authRoute(router);
  masterCompanyRoute(router);
  return router;
};
