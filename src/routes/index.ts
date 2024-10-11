import authRoute from "@routes/auth/auth-route";
import personalInformationRoute from "@routes/personal-information/personal-information-route";
import professionRoute from "@routes/profession/profession-route";
import express from "express";

const router = express.Router();
export default () => {
  authRoute(router);
  professionRoute(router);
  personalInformationRoute(router);

  return router;
};
