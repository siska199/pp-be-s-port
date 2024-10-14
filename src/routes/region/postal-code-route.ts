import { getPostalCodes } from "@controllers/region/postal-code-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/postal-codes", getPostalCodes);
};
