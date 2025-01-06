import {
  getPersonalInformation,
  upsertPersonalInformation,
} from "@3. controllers/2. personal-information-controller";

import authentication from "@_lib/middleware/authentication";
import upload from "@_lib/middleware/upload-file";
import express from "express";

export default (router: express.Router) => {
  router.get("/personal-information", authentication(), getPersonalInformation);
  router.post(
    "/personal-information",
    authentication(),
    upload({
      professional_image: {
        types: ["jpg", "jpeg", "png", "pdf"],
        folder: "personal-information",
      },
    }),
    upsertPersonalInformation
  );
};
