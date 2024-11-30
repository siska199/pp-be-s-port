import {
  getListMasterEducationSchool,
  upsertMasterEducationSchool,
} from "@3. controllers/0.6 master-education-school-controller";
import CONFIG from "@_lib/config";
import { listCommonTypeFileImage } from "@_lib/constants";
import upload from "@_lib/middleware/upload-file";
import express from "express";

export default async (router: express.Router) => {
  router.get("/education-schools", getListMasterEducationSchool);
  router.post(
    "/education-school",
    upload({
      image: {
        types: listCommonTypeFileImage,
        folder: CONFIG.FOLDER_FILE_NAME.EDUCATION_SCHOOL,
      },
    }),
    upsertMasterEducationSchool
  );
  return router;
};
