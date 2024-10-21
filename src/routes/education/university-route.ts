import express from "express";
export default async (router: express.Router) => {
  router.get("/universities", getUniversities);
  router.get("/university/:id", getUniversity);
  router.post("/university", addUniversity);
  router.post("/university-bulk", addUniversityBulk);
  return router;
};
