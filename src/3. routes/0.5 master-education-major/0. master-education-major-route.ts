import {
  addBulkMasterEducationMajor,
  addMasterEducationMajor,
  getListMasterEducationMajor,
} from "@4. controllers/0.5 master-education-major/0. master-education-major-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/education-majors", getListMasterEducationMajor);
  router.post("/education-major", addMasterEducationMajor);
  router.post("/education-majors", addBulkMasterEducationMajor);
  return router;
};
