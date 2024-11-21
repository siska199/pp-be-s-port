import {
  getListProject,
  upsertProject,
} from "@4. controllers/7. project/0. project-controller";
import uploadFile from "@_lib/middleware/upload-file";
import { TTypeFile } from "@_lib/types";
import express from "express";
export default (router: express.Router) => {
  router.get("/project-menus", getListProject);
  router.post(
    "/project-menu",
    uploadFile({
      main_image: {
        types: [TTypeFile.PNG, TTypeFile.JPEG, TTypeFile.JPG],
        folder: "/project-menu",
      },
    }),
    upsertProject
  );
  return router;
};
