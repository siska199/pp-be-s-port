import {
  editPersonalInformation,
  getPersonalInformation,
} from "@controllers/personal-information/personal-information-controller";
import authentication from "@middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/personal-information", authentication, getPersonalInformation);
  router.post(
    "/personal-information/:id",
    authentication,
    editPersonalInformation
  );
  router.delete(
    "/personal-information/:id",
    authentication,
    editPersonalInformation
  );
};
