import { getCities } from "@controllers/city/city-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/cities", getCities);
};
