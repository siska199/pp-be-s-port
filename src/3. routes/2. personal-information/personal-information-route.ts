import personalInfoSchema from "@2. validation/2. personal-information/0. personal-information-schema";
import {
  addPersonaInformation,
  deletePersonalInformation,
  editPersonalInformation,
} from "@4. controllers/2. personal-information/0. personal-information-controller";
import authentication from "@_lib/middleware/authentication";
import upload from "@_lib/middleware/upload-file";
import validateData from "@_lib/middleware/validate-data";
import express from "express";

export default (router: express.Router) => {
  router.post(
    "/personal-information",
    authentication(),
    upload({
      professional_image: {
        types: ["jpg", "jpeg", "png"],
        folder: "personal-information",
      },
    }),
    validateData(personalInfoSchema(true)),
    addPersonaInformation
  );
  router.put(
    "/personal-information/:id",
    authentication(),
    upload({
      professional_image: {
        types: ["jpg", "png"],
        folder: "personal-information",
      },
    }),
    validateData(personalInfoSchema(false)),
    editPersonalInformation
  );
  router.delete(
    "/personal-information/:id",
    authentication(),
    deletePersonalInformation
  );
};