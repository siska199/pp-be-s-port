import {
  deleteProjectMenuById,
  getListProjectMenu,
  upsertProjectMenu,
} from "../3. controllers/7.2 project-menu-controller";
import authentication from "../_lib/middleware/authentication";
import uploadFile from "../_lib/middleware/upload-file";
import { TTypeFile } from "../_lib/types";
import express from "express";
export default (router: express.Router) => {
  router.get("/project-menus", getListProjectMenu);
  router.post(
    "/project-menu",
    authentication(),
    uploadFile({
      main_image: {
        types: [TTypeFile.PNG, TTypeFile.JPEG, TTypeFile.JPG],
        folder: "project-menu",
      },
      related_images: {
        types: [TTypeFile.PNG, TTypeFile.JPEG, TTypeFile.JPG],
        folder: "project-menu-related-image",
        maxCount: 20,
      },
    }),
    upsertProjectMenu
  );
  router.delete("/project-menu/:id", authentication(), deleteProjectMenuById);
  return router;
};
