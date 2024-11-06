import { getListMasterCategorySocialLink } from "@2. controllers/0.3 master-category-social-link/0. master-category-social-link";
import { Router } from "express";
import { createBulkMasterCategorySocialLink } from "@2. controllers/0.3 master-category-social-link/0. master-category-social-link";

export default (router: Router) => {
  router.get("/categories-social-link", getListMasterCategorySocialLink);
  router.post("/categories-social-link", createBulkMasterCategorySocialLink);

  return router;
};
