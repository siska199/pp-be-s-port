import {
  addBulkProfession,
  getProfessions,
} from "@2. controllers/0.2 master-profession/0. master-profession-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/professions", getProfessions);
  router.post("/profession-bulk", addBulkProfession);
};
