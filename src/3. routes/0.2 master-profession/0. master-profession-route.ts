import {
  addBulkMasterProfession,
  getListMasterProfession,
} from "@4. controllers/0.2 master-profession/0. master-profession-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/professions", getListMasterProfession);
  router.post("/professions", addBulkMasterProfession);
  return router;
};
