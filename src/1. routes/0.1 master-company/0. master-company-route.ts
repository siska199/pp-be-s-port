import {
  addBulkMasterCompany,
  addMasterCompany,
  deleteMasterComapnyById,
  getListMasterCompany,
  getMasterCompanyById,
  updateMasterCompanyById,
} from "@2. controllers/0.1 master-company/0. master-company-controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/companies", getListMasterCompany);
  router.get("/company/:id", getMasterCompanyById);
  router.post("/company", addMasterCompany);
  router.post("/companies", addBulkMasterCompany);
  router.put("/company/:id", updateMasterCompanyById);
  router?.delete("/company/:id", deleteMasterComapnyById);
};
