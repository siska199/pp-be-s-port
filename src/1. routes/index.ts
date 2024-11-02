import masterCompanyRoute from "@1. routes/0.1 master-company/0. master-company-route";
import express from "express";

const router = express.Router();
export default () => {
  masterCompanyRoute(router);
  return router;
};
