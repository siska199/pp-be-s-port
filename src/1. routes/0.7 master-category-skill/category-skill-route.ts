import {
  addBulkCategorySkill,
  addCategorySkill,
  getCategoriesSkill,
} from "@controllers/0.7 master-category-skill/category-skill-controller";
import authentication from "@middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/categories-skill", getCategoriesSkill);
  router.post("/category-skill", authentication(), addCategorySkill);
  router.post("/category-skill-bulk", authentication(), addBulkCategorySkill);
  return router;
};
