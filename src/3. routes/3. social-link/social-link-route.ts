import {
  getSocialLink,
  getSocialLinks,
} from "@4. controllers/3. social-link/0. social-link-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/social-links", getSocialLinks);
  router.get("/social-links/:id", getSocialLink);
  router.put("/social-links/:id", authentication(), getSocialLink);
  router.delete("/social-links/:id", authentication(), getSocialLink);
};
