import {
  getListMasterSkill,
  upsertMasterSkill,
} from "../3. controllers/0.8 master-skill-controller";
import CONFIG from "../_lib/config";
import { listCommonTypeFileImage } from "../_lib/constants";
import uploadFile from "../_lib/middleware/upload-file";
import express from "express";

export default (router: express.Router) => {
  router.get("/skills", getListMasterSkill);
  router.post(
    "/skill",
    uploadFile({
      image: {
        folder: CONFIG.FOLDER_FILE_NAME.SKILL,
        types: listCommonTypeFileImage,
      },
    }),
    upsertMasterSkill
  );
  return router;
};
