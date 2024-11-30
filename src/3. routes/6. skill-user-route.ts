import {
  createBulkSkillUser,
  deleteSkillUserById,
  getListSkillUser,
  getSkillUserById,
  upsertSkillUser,
} from "@4. controllers/6. skill-user-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/skill-users", authentication(), getListSkillUser);
  router.post("/skill-users", authentication(), createBulkSkillUser);
  router.post("/skill-user", authentication(), upsertSkillUser);
  router.post("/skill-user/:id", authentication(), getSkillUserById);
  router.delete("/skill-user/:id", authentication(), deleteSkillUserById);

  return router;
};
