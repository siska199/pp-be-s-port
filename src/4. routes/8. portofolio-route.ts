import express from 'express';
import { getListEducationPortofolio, getListExperiancePortofolio, getListKeyMetricPortofolio, getListProjectPortofolio, getListSkillUserCategoryPortofolio, getListSkillUserPortofolio, getListSocialLinkPortofolio, getPersonalInformationPortofolio } from '../3. controllers/8 portofolio-controller';
import { validateRequiredQueryPortofolio } from '../_lib/middleware/validate-query-params-portofolio';
export default (router: express.Router) => {
  router.get("/portofolio/personal-information", validateRequiredQueryPortofolio(['username']), getPersonalInformationPortofolio);
  router.get("/portofolio/social-links", validateRequiredQueryPortofolio(['username']), getListSocialLinkPortofolio);
  router.get("/portofolio/key-metrics",validateRequiredQueryPortofolio(['username']), getListKeyMetricPortofolio);
  router.get("/portofolio/category-skills",validateRequiredQueryPortofolio(['username']), getListSkillUserCategoryPortofolio);
  router.get("/portofolio/skills",validateRequiredQueryPortofolio(['username']), getListSkillUserPortofolio);
  router.get("/portofolio/projects",validateRequiredQueryPortofolio(['username']), getListProjectPortofolio);
  router.get("/portofolio/experiances",validateRequiredQueryPortofolio(['username']), getListExperiancePortofolio);
  router.get("/portofolio/educations",validateRequiredQueryPortofolio(['username']), getListEducationPortofolio);
  return router;
};
