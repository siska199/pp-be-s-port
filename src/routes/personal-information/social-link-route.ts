import {
  getSocialLink,
  getSocialLinks,
} from "@controllers/personal-information/social-link-controller";
import authentication from "@middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/social-links", authentication, getSocialLinks);
  router.get("/social-links/:id", authentication, getSocialLink);
  router.put("/social-links/:id", authentication, getSocialLink);
  router.delete("/social-links/:id", authentication, getSocialLink);
};
