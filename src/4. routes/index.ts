import masterCategorySocialLinkRoute from "./0.7 master-category-social-link";
import masterCompanyRoute from "./0.1 master-company-route";
import masterProfessionRoute from "./0.2 master-profession-route";
import masterEducationLevelRoute from "./0.4 master-education-level";
import masterEducationMajorRoute from "./0.5 master-education-major-route";
import masterEducationSchoolRoute from "./0.6 master-education-school-route";
import masterCategorySkillRoute from "./0.3 master-category-skill-route";
import masterSkillRoute from "./0.8 master-skill-route";
import masterProvinceRoute from "./0.9.1 master-province-route";
import masterCityRoute from "./0.9.2 master-city-route";
import masterDistrictRoute from "./0.9.3 master-district-route";
import masterPostalCodeRoute from "./0.9.4 master-postal-code-route";
import authRoute from "./1. auth-route";
import personalInformationRoute from "./2. personal-information-route";
import socialLinkRoute from "./3. social-link-route";
import educationRoute from "./4. education-route";
import experianceRoute from "./5. experiance-route";
import skillUserRoute from "./6. skill-user-route";
import projectRoute from "./7.0 project-route";
import projectMenuRoute from "./7.2 project-menu-route";
import keyMetricRoute from "./2.1 key-metric-route"
import express from "express";
import projectResponsibilityRoute from "./7.1 project-responsibility-route";
import portofolioRoute from "./8. portofolio-route";
import projectLinkRoute from "./7.4 project-link-route";
import commonRoute from "./0.0 common-route";

const router = express.Router();
export default () => {
  masterCompanyRoute(router);
  masterProfessionRoute(router);
  masterCategorySocialLinkRoute(router);
  masterEducationLevelRoute(router);
  masterEducationMajorRoute(router);
  masterCategorySkillRoute(router);
  masterEducationSchoolRoute(router);
  masterSkillRoute(router);
  masterProfessionRoute(router);
  masterProvinceRoute(router);
  masterCityRoute(router);
  masterDistrictRoute(router);
  masterPostalCodeRoute(router);

  authRoute(router);
  personalInformationRoute(router);
  keyMetricRoute(router)
  socialLinkRoute(router);
  educationRoute(router);
  experianceRoute(router);
  skillUserRoute(router);
  projectRoute(router);
  projectMenuRoute(router);
  projectResponsibilityRoute(router);
  projectLinkRoute(router);
  commonRoute(router)
  portofolioRoute(router);
  return router;
};
