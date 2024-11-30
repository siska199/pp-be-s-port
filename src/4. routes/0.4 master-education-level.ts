import {
  createBulkMasterEducationLevel,
  getListMasterEducationLevel,
  upsertMasterEducationLevel,
} from "@3. controllers/0.4 master-education-level";
import express from "express";

export default (router: express.Router) => {
  router.get("/education-levels", getListMasterEducationLevel);
  router.post("/education-level", upsertMasterEducationLevel);
  router.post("/education-levels", createBulkMasterEducationLevel);
  return router;
};
