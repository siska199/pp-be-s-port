import {
  addBulkCategorySkill,
  addCategorySkill,
  getCategoriesSkill,
} from "@controllers/category-skill/category-skill-controller";
import express from "express";
import authentication from "@middleware/authentication";

export default (router: express.Router) => {
  router.get("/categories-skill", getCategoriesSkill);
  router.post("/category-skill", authentication(), addCategorySkill);
  router.post("/category-skill-bulk", authentication(), addBulkCategorySkill);

  return router;
};
