import { getSkills } from "@controllers/skill/skill-controller";
import express from "express";
export default (router: express.Router) => {

  router.get("/skills", getSkills);
  router.get("/skill/:id");
  router.post("/skill");
  router.put("/skill/:id");
  router.delete("/skill/:id");

  return router;
};
