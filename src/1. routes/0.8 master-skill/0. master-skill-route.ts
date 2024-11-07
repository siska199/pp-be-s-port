import { addBulkMasterSkill, getListMasterSkill } from "@2. controllers/0.8 master-skill/master-skill-controller";
import express from "express";

export default (router: express.Router) => {
  router.get('/skills', getListMasterSkill)
  router.post('/skills',addBulkMasterSkill)
  return router;
};
