import {
  getListProjectResponsibility,
  upsertProjectResponsibility,
} from "@4. controllers/7. project/1. project-responsibility-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("project-responsibilities", getListProjectResponsibility);
  router.post("project-responsibility", upsertProjectResponsibility);
  return router;
};
