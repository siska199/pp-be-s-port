import {
  addBulkMasterCompany,
  addMasterCompany,
  deleteMasterComapnyById,
  getListMasterCompany,
  getMasterCompanyById,
  updateMasterCompanyById,
} from "@2. controllers/0.1 master-company/0. master-company-controller";
import validateData from "@_lib/middleware/validate-data";
import masterCompanySchema from "@_lib/validation/0.1 master-copany/0. master-company-schema";
import express from "express";

export default (router: express.Router) => {
  router.get("/companies", getListMasterCompany);
  router.get("/company/:id", getMasterCompanyById);
  router.post(
    "/company",
    validateData(masterCompanySchema()),
    addMasterCompany
  );
  router.post("/companies", addBulkMasterCompany);
  router.put(
    "/company/:id",
    validateData(masterCompanySchema(true)),
    updateMasterCompanyById
  );
  router?.delete("/company/:id", deleteMasterComapnyById);
};
