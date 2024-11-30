import { getListMasterDistrict } from "@3. controllers/0.9.3 district-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/districts", getListMasterDistrict);
  return router;
};
