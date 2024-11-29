import {
  getListProjectTechStack,
  upsertProjectTechStack,
} from "@4. controllers/7.5 project-tech-stack-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/project-tech-stacks", getListProjectTechStack);
  router.post("/project-texh-stack", authentication(), upsertProjectTechStack);
  return router;
};
