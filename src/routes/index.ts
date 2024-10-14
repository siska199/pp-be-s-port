import authRoute from "@routes/auth/auth-route";
import cityRoute from "@routes/city/city-route";
import districtRoute from "@routes/district/district-route";
import personalInformationRoute from "@routes/personal-information/personal-information-route";
import postalCodeRoute from "@routes/postal-code/postal-code-route";
import professionRoute from "@routes/profession/profession-route";
import provinceRoute from "@routes/province/province-route";
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
  return router;
};
