import { getProvinces } from "@controllers/province/province-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/provinces", getProvinces);
};
