import {
  addPersonaInformation,
  deletePersonalInformation,
  editPersonalInformation,
  getPersonalInformation,
} from "@controllers/personal-information/personal-information-controller";
import authentication from "@middleware/authentication";
import upload from "@middleware/upload-file";
import validateData from "@middleware/validate-data";
import personalInfoSchema from "@validation/personal-information/personal-information-schema";
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
