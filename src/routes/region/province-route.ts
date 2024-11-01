import { getProvinces } from "@controllers/region/province-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/provinces", getProvinces);
};
