import {
  addMasterEducationSchool,
  getListMasterEducationSchool,
} from "@2. controllers/0.6 master-education-school/0. master-education-school-controller";
import upload from "@_lib/middleware/upload-file";
import express from "express";
export default async (router: express.Router) => {
  router.get("/education-schools", getListMasterEducationSchool);
  router.post(
    "/education-school",
    upload({
      image: {
        types: ["jpg", "png"],
        folder: "education_school",
      },
    }),
    addMasterEducationSchool
  );
  return router;
};
