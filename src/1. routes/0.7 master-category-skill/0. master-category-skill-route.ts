import { addBulkMasterCategorySkill } from "@2. controllers/0.7 master-category-skill/0. master-category-skill-controller";
import express from "express";
import { getListmasterCategorySkill } from "@2. controllers/0.7 master-category-skill/0. master-category-skill-controller";

export default (router: express.Router) => {
  router.get("/categories-skill", getListmasterCategorySkill);
  router.post("/categories-skill", addBulkMasterCategorySkill);
  return router;
};
