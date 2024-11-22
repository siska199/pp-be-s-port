import {
  createBulkMasterEducationMajor,
  getListMasterEducationMajor,
  upsertMasterEducationMajor,
} from "@4. controllers/0.5 master-education-major/0. master-education-major-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/education-majors", getListMasterEducationMajor);
  router.post("/education-majors", createBulkMasterEducationMajor);
  router.post("/education-major", upsertMasterEducationMajor);
  return router;
};
