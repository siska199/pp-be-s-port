import {
  deleteProjectResponsibilityById,
  getListProjectResponsibility,
  upsertProjectResponsibility,
} from "@3. controllers/7.1 project-responsibility-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/project-responsibilities", getListProjectResponsibility);
  router.post(
    "/project-responsibility",
    authentication(),
    upsertProjectResponsibility
  );
  router.delete("/project-responsibility/:id", authentication(), deleteProjectResponsibilityById);

  return router;
};
