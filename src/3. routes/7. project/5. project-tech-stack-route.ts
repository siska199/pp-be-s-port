import {
  getListProjectTechStack,
  upsertProjectTechStack,
} from "@4. controllers/7. project/5. project-tech-stack-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/project-tech-stacks", getListProjectTechStack);
  router.post("/project-texh-stack", upsertProjectTechStack);
  return router;
};
