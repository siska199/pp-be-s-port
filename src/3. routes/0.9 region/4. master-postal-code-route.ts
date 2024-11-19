import { getListMasterPostalCode } from "@4. controllers/0.9 master-region/4. postal-code-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/postal-codes", getListMasterPostalCode);
  return router;
};
