import {
  addMasterCompany,
  getListMasterCompany,
} from "@4. controllers/0.1 master-company/0. master-company-controller";
import uploadFile from "@_lib/middleware/upload-file";
import { TTypeFile } from "@_lib/types";
import express from "express";

export default (router: express.Router) => {
  router.get("/companies", getListMasterCompany);
  router.post(
    "/company",
    uploadFile({
      image: {
        types: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
        folder: "company",
      },
    }),
    addMasterCompany
  );
};
