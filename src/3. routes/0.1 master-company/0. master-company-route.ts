import {
  deleteMasterComapnyById,
  getListMasterCompany,
  upsertMasterCompany,
} from "@4. controllers/0.1 master-company/0. master-company-controller";
import CONFIG from "@_lib/config";
import { listCommonTypeFileImage } from "@_lib/constants";
import uploadFile from "@_lib/middleware/upload-file";
import express from "express";

export default (router: express.Router) => {
  router.get("/companies", getListMasterCompany);
  router.post(
    "/company",
    uploadFile({
      image: {
        types: listCommonTypeFileImage,
        folder: CONFIG.FOLDER_FILE_NAME.COMPANY,
      },
    }),
    upsertMasterCompany
  );
  router.delete("/company/:id", deleteMasterComapnyById);
};
