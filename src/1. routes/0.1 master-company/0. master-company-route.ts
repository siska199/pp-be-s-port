import {
  addBulkMasterCompany,
  addMasterCompany,
  deleteMasterComapnyById,
  getListMasterCompany,
  getMasterCompanyById,
  updateMasterCompanyById,
} from "@2. controllers/0.1 master-company/0. master-company-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/companies", getListMasterCompany);
  router.get("/company/:id", getMasterCompanyById);
  router.post("/company", authentication(), addMasterCompany);
  router.post("/companies", authentication(), addBulkMasterCompany);
  router.put("/company/:id", authentication(), updateMasterCompanyById);
  router?.delete("/company/:id", authentication(), deleteMasterComapnyById);
};
