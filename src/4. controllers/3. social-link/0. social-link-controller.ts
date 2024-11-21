import {
  getListSocialLinkDto,
  upsertSocialLinkDto,
} from "@1. dto/3. social-link/0. social-link-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getListSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const result = await getListSocialLinkDto();
    successResponse({
      res,
      data: result,
      message: "Success Get Social links User",
    });
  }
);
export const upsertSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const result = await upsertSocialLinkDto({
      ...payload,
      id_user: user?.id,
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload.id),
    });
  }
);
