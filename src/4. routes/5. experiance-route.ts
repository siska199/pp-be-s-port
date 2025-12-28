import {
  createBulkExperiance,
  deleteExperianceById,
  getExperianceById,
  getListExperiance,
  upsertExperiance,
} from "../3. controllers/5. experiance-controller";
import authentication from "../_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/experiances", authentication(), getListExperiance);
  router.post("/experiances", authentication(), createBulkExperiance);
  router.post("/experiance", authentication(), upsertExperiance);
  router.post("/experiance/:id", authentication(), getExperianceById);
  router.delete("/experiance/:id", authentication(), deleteExperianceById);

  return router;
};
