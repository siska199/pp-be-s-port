import {
  getListProjectResponsibilityDto,
  upsertProjectResponsiblityDto,
} from "@2. dto/7.1 project-responsibility-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getListProjectResponsibility = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;

    const result = await getListProjectResponsibilityDto(String(user?.id));

    successResponse({
      res,
      message: message?.success?.getData,
      data: result,
    });
  }
);

export const upsertProjectResponsibility = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params;
    const user = req.user;
    const payload = req.body;

    const result = await upsertProjectResponsiblityDto({
      ...payload,
      id,
      id_user: String(user?.id),
    });

    successResponse({
      message: message.success.upserData(payload?.id),
      res,
      data: result,
    });
  }
);
