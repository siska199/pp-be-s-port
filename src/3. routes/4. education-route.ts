import {
  getEducationById,
  getListEducation,
  upsertEducation,
} from "@4. controllers/4. education-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/educations", authentication(), getListEducation);
  router.get("/education/:id", authentication(), getEducationById);
  router.post("/education", authentication(), upsertEducation);
  return router;
};
