import catchErrors from "@helpers/catch-error";
import upload from "@middleware/upload-file";
import authRoute from "@routes/auth/auth-route";
import personalInformationRoute from "@routes/personal-information/personal-information-route";
import professionRoute from "@routes/profession/profession-route";
import express, { Response, Request } from "express";

const router = express.Router();
export default () => {
  authRoute(router);
  professionRoute(router);
  personalInformationRoute(router);

  router.post(
    "/upload",
    upload({
      professional_image: {
        types: ["image/jpeg", "image/png"],
        size: 1,
      },
      thumbnail: {
        types: ["image/jpeg", "image/png"],
        size: 2,
      },
    }),
    catchErrors(async (req: Request, res: Response) => {
      // console.log(req.body, res);
    })
  );

  return router;
};
