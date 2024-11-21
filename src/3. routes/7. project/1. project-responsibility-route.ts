import {
  getListProjectResponsibility,
  upsertProjectResponsibility,
} from "@4. controllers/7. project/1. project-responsibility-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("project-responsibilities", getListProjectResponsibility);
  router.post(
    "project-responsibility",
    authentication(),
    upsertProjectResponsibility
  );
  return router;
};
