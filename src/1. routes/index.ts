import masterCompanyRoute from "@1. routes/0.1 master-company/0. master-company-route";
import masterProfessionRoute from "@1. routes/0.2 master-profession/0. master-profession-route";
import masterCategorySocialLinkROute from "@1. routes/0.3 master-category-social-link/0. master-category-social-link";
import masterEducationLevelRoute from "@1. routes/0.4 master-education-level/0. master-education-level";
import masterEducationMajorRoute from "@1. routes/0.5 master-education-major/0. master-education-major-route";
import masterEducationSchoolRoute from "@1. routes/0.6 master-education-school/0. master-education-school-route";
import masterCategorySkillRoute from "@1. routes/0.7 master-category-skill/0. master-category-skill-route";
import authRoute from "@1. routes/1. user/1. auth-route";
import express from "express";

const router = express.Router();
export default () => {
  authRoute(router);
  masterCompanyRoute(router);
  masterProfessionRoute(router);
  masterCategorySocialLinkROute(router);
  masterEducationLevelRoute(router);
  masterEducationMajorRoute(router);
  masterCategorySkillRoute(router);
  masterEducationSchoolRoute(router);
  return router;
};
