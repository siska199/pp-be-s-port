import {
  addBulkCategorySkill,
  addCategorySkill,
  getCategoriesSkill,
} from "@controllers/category-skill/category-skill-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/categories-skill", getCategoriesSkill);
  router.post("/category-skill", addCategorySkill);
  router.get("/category-skill-bulk", addBulkCategorySkill);

  return router;
};
