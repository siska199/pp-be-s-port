import authRoute from "@routes/auth/auth-route";
import categorySkillRoute from "@routes/skill/category-skill-route";
import majorRoute from "@routes/education/major-route";

import personalInformationRoute from "@routes/personal-information/personal-information-route";
import professionRoute from "@routes/profession/profession-route";
import cityRoute from "@routes/region/city-route";
import districtRoute from "@routes/region/district-route";
import postalCodeRoute from "@routes/region/postal-code-route";
import provinceRoute from "@routes/region/province-route";
import skillRoute from "@routes/skill/skill-route";
import skillUserRoute from "@routes/skill/skill-user-route";
import express from "express";

const router = express.Router();
export default () => {
  authRoute(router);
  professionRoute(router);
  personalInformationRoute(router);
  provinceRoute(router);
  cityRoute(router);
  districtRoute(router);
  postalCodeRoute(router);
  categorySkillRoute(router);
  skillRoute(router);
  skillUserRoute(router);
  majorRoute(router);
  return router;
};
