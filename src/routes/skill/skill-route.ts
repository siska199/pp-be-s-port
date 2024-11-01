import {
  addSkill,
  addSkillBulk,
  editSkill,
  getSkill,
  getSkills,
  removeSkill,
} from "@controllers/skill/skill-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/skills", getSkills);
  router.post("/skill", addSkill);
  router.post("/skill-bulk", addSkillBulk);
  router.get("/skill/:id", getSkill);
  router.put("/skill/:id", editSkill);
  router.delete("/skill/:id", removeSkill);
  
  return router;
};
