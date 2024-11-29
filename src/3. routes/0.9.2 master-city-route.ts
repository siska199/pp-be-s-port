import { getListMasterCity } from "@4. controllers/0.9.2 master-city-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/cities", getListMasterCity);
  return router;
};
