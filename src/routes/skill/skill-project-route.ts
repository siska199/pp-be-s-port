import {
  addSkillProject,
  editSkillProject,
  getSkillProject,
  getSkillsProject,
  removeSkillProject,
} from "@controllers/skill/skill-project-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/skills-project", getSkillsProject);
  router.get("/skill-project/:id", getSkillProject);
  router.post("/skill-project", addSkillProject);
  router.put("/skill-project/:id", editSkillProject);
  router.delete("/skill-project/:id", removeSkillProject);
};
