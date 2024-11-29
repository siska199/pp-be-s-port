import {
  addBulkMasterEducationLevel,
  getListMasterEducationLevel,
} from "@4. controllers/0.4 master-education-level";
import express from "express";

export default (router: express.Router) => {
  router.get("/education-levels", getListMasterEducationLevel);
  router.post("/education-levels", addBulkMasterEducationLevel);
  return router;
};