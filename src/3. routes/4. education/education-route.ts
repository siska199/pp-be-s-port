import {
  getListEducation,
  upsertEducation,
} from "@4. controllers/4. education/0. education-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/educations", getListEducation);
  router.post("/education", authentication(), upsertEducation);
  return router;
};
