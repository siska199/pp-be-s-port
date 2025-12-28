import {
  createBulkEducation,
  deleteEducationById,
  getEducationById,
  getListEducation,
  upsertEducation,
} from "../3. controllers/4. education-controller";
import authentication from "../_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/educations", authentication(), getListEducation);
  router.get("/education/:id", authentication(), getEducationById);
  router.delete("/education/:id", authentication(), deleteEducationById);
  router.post("/education", authentication(), upsertEducation);
  router.post("/educations", authentication(), createBulkEducation);

  return router;
};
