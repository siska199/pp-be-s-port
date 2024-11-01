import {
  addBulkMajor,
  addMajor,
  getMajor,
  getMajors,
} from "@2. controllers/0.5 master-education-major/education-major-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/majors", getMajors);
  router.get("/major/:id", getMajor);
  router.post("/major", addMajor);
  router.post("/major-bulk", addBulkMajor);

  return router;
};
