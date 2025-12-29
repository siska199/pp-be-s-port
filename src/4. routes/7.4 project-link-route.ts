import express from "express";
import {
    deleteProjectLinkById,
    getListProjectLink,
    upsertProjectLink,
} from "../3. controllers/7.4 project-link-controller";
import authentication from "../_lib/middleware/authentication";

export default (router: express.Router) => {
  router.get("/project-links", getListProjectLink);

  router.post(
    "/project-link",
    authentication(),
    upsertProjectLink
  );

  router.delete(
    "/project-link/:id",
    authentication(),
    deleteProjectLinkById
  );

  return router;
};
