import {
  addMasterSkill,
  getListMasterSkill,
} from "@2. controllers/0.8 master-skill/master-skill-controller";
import uploadFile from "@_lib/middleware/upload-file";
import { TTypeFile } from "@_lib/types";
import express from "express";

export default (router: express.Router) => {
  router.get("/skills", getListMasterSkill);
  router.post(
    "/skill",
    uploadFile({
      image: {
        folder: "skill",
        types: [
          TTypeFile.JPEG,
          TTypeFile.JPG,
          TTypeFile.WEBP,
          TTypeFile.PNG,
          TTypeFile.SVG,
        ],
      },
    }),
    addMasterSkill
  );
  return router;
};
