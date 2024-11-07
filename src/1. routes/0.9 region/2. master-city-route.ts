import { getListMasterCity } from "@2. controllers/0.9 master-region/2. master-city-controller";
import express from "express";

export default (router: express.Router) => {
  router.get('/cities', getListMasterCity)
  return router;
};
