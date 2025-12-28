import {
  deleteMasterCategorySocialLinkById,
  getListMasterCategorySocialLink,
  upsertMasterCategorySocialLink,
} from "../3. controllers/0.3 master-category-social-link";
import CONFIG from "../_lib/config";
import { listCommonTypeFileImage } from "../_lib/constants";
import uploadFile from "../_lib/middleware/upload-file";
import { Router } from "express";

export default (router: Router) => {
  router.get("/category-social-links", getListMasterCategorySocialLink);
  router.post(
    "/category-social-link",
    uploadFile({
      image: {
        types: listCommonTypeFileImage,
        folder: CONFIG.FOLDER_FILE_NAME.CATEGORY_SOCIAL_LINK,
      },
    }),
    upsertMasterCategorySocialLink
  );
  router.delete(
    "/category-social-link/:id",
    deleteMasterCategorySocialLinkById
  );
  return router;
};
