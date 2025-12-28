import {
  getPersonalInfoByAnyParamService,
  upsertPersonalInformationService,
} from "../2. service/2. personal-information-service";

import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute } from "../_lib/types";
import { Response } from "express";

export const getPersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const id = req.query.id?.toString();
    const id_user = user?.id;
    const result = await getPersonalInfoByAnyParamService({
      id,
      id_user,
    });

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const upsertPersonalInformation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertPersonalInformationService({
      ...payload,
      id: payload.id || undefined,
      id_user: user?.id || undefined,
    });

    successResponse({
      res,
      data: result,
      message: message?.success?.upserData(String(payload.id)),
    });
  }
);
