import {
  getListProjectMenuRelatedImageMenu,
  upasertProjectMenuRelatedImage,
} from "@4. controllers/7. project/4. project-menu-related-image-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get(
    "/project-menu-related-images",
    getListProjectMenuRelatedImageMenu
  );
  router.post(
    "/project-menu-related-image",
    authentication(),
    upasertProjectMenuRelatedImage
  );
  return router;
};
