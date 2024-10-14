import { getDistricts } from "@controllers/district/district-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/districts", getDistricts);
};
