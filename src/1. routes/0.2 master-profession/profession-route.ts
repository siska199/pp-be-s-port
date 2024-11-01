import {
  addBulkProfession,
  getProfessions,
} from "@controllers/0.2 master-profesi/profession-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/professions", getProfessions);
  router.post("/profession-bulk", addBulkProfession);
};
