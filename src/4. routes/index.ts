import masterCategorySocialLinkRoute from "@4. routes/0.7 master-category-social-link";
import masterCompanyRoute from "@4. routes/0.1 master-company-route";
import masterProfessionRoute from "@4. routes/0.2 master-profession-route";
import masterEducationLevelRoute from "@4. routes/0.4 master-education-level";
import masterEducationMajorRoute from "@4. routes/0.5 master-education-major-route";
import masterEducationSchoolRoute from "@4. routes/0.6 master-education-school-route";
import masterCategorySkillRoute from "@4. routes/0.3 master-category-skill-route";
import masterSkillRoute from "@4. routes/0.8 master-skill-route";
import masterProvinceRoute from "@4. routes/0.9.1 master-province-route";
import masterCityRoute from "@4. routes/0.9.2 master-city-route";
import masterDistrictRoute from "@4. routes/0.9.3 master-district-route";
import masterPostalCodeRoute from "@4. routes/0.9.4 master-postal-code-route";
import authRoute from "@4. routes/1. auth-route";
import personalInformationRoute from "@4. routes/2. personal-information-route";
import socialLinkRoute from "@4. routes/3. social-link-route";
import educationRoute from "@4. routes/4. education-route";
import experianceRoute from "@4. routes/5. experiance-route";
import skillUserRoute from "@4. routes/6. skill-user-route";
import projectRoute from "@4. routes/7.0 project-route";
import projectMenuRoute from "@4. routes/7.2 project-menu-route";
import keyMetricRoute from "@4. routes/2.1 key-metric-route"
import express from "express";

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
  return router;
};
