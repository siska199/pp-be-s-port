import { getDistricts } from "@controllers/region/district-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/districts", getDistricts);
};
