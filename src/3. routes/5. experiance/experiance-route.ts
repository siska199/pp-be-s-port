import {
  getListExperiance,
  upsertExperiance,
} from "@4. controllers/5. experiance/0. experiance-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/experiances", getListExperiance);
  router.post("/experiance", upsertExperiance);
  return router;
};
