import {
  addSkillUser,
  editSkillUser,
  getSkillsUser,
  getSkillUser,
  removeSkillUser,
} from "@controllers/skill/skill-user-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/skills-user", getSkillsUser);
  router.post("/skill-user", addSkillUser);
  router.get("/skill-user/:id", getSkillUser);
  router.put("/skill-user/:id", editSkillUser);
  router.delete("/skill-user/:id", removeSkillUser);

  return router;
};
