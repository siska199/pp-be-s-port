import { upsertMasterCompany } from "@4. controllers/0.1 master-company-controller";
import {
  createBulkMasterProfession,
  deleteMasterProfessionById,
  getListMasterProfession,
} from "@4. controllers/0.2 master-profession-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/professions", getListMasterProfession);
  router.post("/professions", createBulkMasterProfession);
  router.post("/profession", upsertMasterCompany);
  router.delete("/profession/:id", deleteMasterProfessionById);
  return router;
};
