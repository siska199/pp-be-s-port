import {
  getPersonalInfoByAnyParamDto,
  upsertPersonalInformationDto,
} from "@1. dto/2. personal-information-dto";

import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getPersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_user = req.user?.id as string;

    const result = await getPersonalInfoByAnyParamDto({
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
    const payload = req.body;

    const result = await upsertPersonalInformationDto({
      ...payload,
    });

    successResponse({
      res,
      data: result,
      message: message?.success?.upserData(String(payload.id)),
    });
  }
);
