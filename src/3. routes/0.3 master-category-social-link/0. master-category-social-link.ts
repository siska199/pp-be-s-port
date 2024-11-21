import {
  createMasterCategorySocialLink,
  getListMasterCategorySocialLink,
} from "@4. controllers/0.3 master-category-social-link/0. master-category-social-link";
import uploadFile from "@_lib/middleware/upload-file";
import { TTypeFile } from "@_lib/types";
import { Router } from "express";

export default (router: Router) => {
  router.get("/categories-social-link", getListMasterCategorySocialLink);
  router.post(
    "/categories-social-link",
    uploadFile({
      image: {
        types: [TTypeFile.JPG, TTypeFile.JPEG, TTypeFile.PNG],
        folder: "/category-social-link",
        maxCount: 1,
      },
    }),
    createMasterCategorySocialLink
  );
  return router;
};
