import {
  getListProject,
  upsertProject,
} from "@4. controllers/7. project-controller";
import authentication from "@_lib/middleware/authentication";
import uploadFile from "@_lib/middleware/upload-file";
import { TTypeFile } from "@_lib/types";
import express from "express";
export default (router: express.Router) => {
  router.get("/project-menus", getListProject);
  router.post(
    "/project-menu",
    authentication(),
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