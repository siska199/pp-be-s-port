import {
  createBulkMasterProfession,
  deleteMasterProfessionById,
  getListMasterProfession,
  upsertMasterProfession,
} from "../3. controllers/0.2 master-profession-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/professions", getListMasterProfession);
  router.post("/professions", createBulkMasterProfession);
  router.post("/profession", upsertMasterProfession);
  router.delete("/profession/:id", deleteMasterProfessionById);
  return router;
};
