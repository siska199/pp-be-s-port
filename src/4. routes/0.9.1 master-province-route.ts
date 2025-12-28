import { getListMasterProvince } from "../3. controllers/0.9.1 master-province-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/provinces", getListMasterProvince);
  return router;
};
