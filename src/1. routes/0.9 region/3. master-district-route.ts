import { getListMasterDistrict } from "@2. controllers/0.9 master-region/3. district-controller";
import express from "express";

export default (router: express.Router) => {
  router.get('/districts', getListMasterDistrict)
  return router;
};
