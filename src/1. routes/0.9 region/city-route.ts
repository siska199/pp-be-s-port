import { getCities } from "@controllers/region/city-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/cities", getCities);
};
