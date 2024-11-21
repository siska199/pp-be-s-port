import {
  getListProjectMenuRelatedImageMenu,
  upasertProjectMenuRelatedImage,
} from "@4. controllers/7. project/4. project-menu-related-image-controller";
import express from "express";

export default (router: express.Router) => {
  router.get(
    "/project-menu-related-images",
    getListProjectMenuRelatedImageMenu
  );
  router.post("/project-menu-related-image", upasertProjectMenuRelatedImage);
  return router;
};
