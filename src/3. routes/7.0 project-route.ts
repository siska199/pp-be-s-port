import {
  getListProject,
  upsertProject,
} from "@4. controllers/7. project-controller";
import { listCommonTypeFileImage } from "@_lib/constants";
import authentication from "@_lib/middleware/authentication";
import uploadFile from "@_lib/middleware/upload-file";
import express from "express";

export default (router: express.Router) => {
  router.get("/projects", getListProject);
  router.post(
    "/project",
    authentication(),
    uploadFile({
      thumbnail_image: {
        folder: "/project",
        types: listCommonTypeFileImage,
      },
    }),
    upsertProject
  );
  return router;
};
