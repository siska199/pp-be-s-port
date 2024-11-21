import {
  getListSkillUser,
  upsertSkillUser,
} from "@4. controllers/6. skill-user/0. skill-user-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/skill-users", getListSkillUser);
  router.post("/skill-user", upsertSkillUser);

  return router;
};
