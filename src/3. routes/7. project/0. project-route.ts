import {
  getListProject,
  upsertProject,
} from "@4. controllers/7. project/0. project-controller";
import authentication from "@_lib/middleware/authentication";
import uploadFile from "@_lib/middleware/upload-file";
import { TTypeFile } from "@_lib/types";
import express from "express";

export default (router: express.Router) => {
  router.get("/projects", getListProject);
  router.post(
    "/project",
    authentication(),
    uploadFile({
      thumbnail_image: {
        folder: "/project",
        types: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
      },
    }),
    upsertProject
  );
  return router;
};
