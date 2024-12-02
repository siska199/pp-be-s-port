import {
  createBulkSocialLink,
  deleteSocialLink,
  getListSocialLink,
  upsertSocialLink,
} from "@3. controllers/3. social-link-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/social-links", authentication(), getListSocialLink);
  router.post("/social-links", authentication(), createBulkSocialLink);
  router.post("/social-link", authentication(), upsertSocialLink);
  router.post("/social-link/:id", authentication(), deleteSocialLink);
};
