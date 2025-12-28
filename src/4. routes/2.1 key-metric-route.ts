
import { deleteKeyMetric, getListKeyMetric, upsertBulkKeyMetric, upsertKeyMetric } from "../3. controllers/2.1 key-metric-controller";
import authentication from "../_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/key-metrics", authentication(), getListKeyMetric);
  router.post("/key-metrics", authentication(), upsertBulkKeyMetric);
  router.post("/key-metric", authentication(), upsertKeyMetric);
  router.post("/key-metric/:id", authentication(), deleteKeyMetric);
};
