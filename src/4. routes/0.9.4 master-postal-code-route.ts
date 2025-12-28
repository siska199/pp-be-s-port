import { getListMasterPostalCode } from "../3. controllers/0.9.4 postal-code-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/postal-codes", getListMasterPostalCode);
  return router;
};
