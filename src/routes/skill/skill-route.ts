import { addSkill, editSkill, getSkill, getSkills, removeSkill } from "@controllers/skill/skill-controller";
import express from "express";
export default (router: express.Router) => {

  router.get("/skills", getSkills);
  router.post("/skill", addSkill);
  router.get("/skill/:id", getSkill);
  router.put("/skill/:id",editSkill);
  router.delete("/skill/:id", removeSkill);

  return router;
};
