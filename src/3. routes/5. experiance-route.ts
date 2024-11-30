import {
  getListExperiance,
  upsertExperiance,
} from "@4. controllers/5. experiance-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/experiances", authentication(), getListExperiance);
  router.post("/experiance", authentication(), upsertExperiance);
  return router;
};
