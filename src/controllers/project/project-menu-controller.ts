import express from "express";

export default (router: express.Router) => {
  router.get("/project-menu");
  
  return router;
};
