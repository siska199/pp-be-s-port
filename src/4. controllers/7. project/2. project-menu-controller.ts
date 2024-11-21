import {
  getListProjectMenuDto,
  upsertProjectMenuDto,
} from "@1. dto/7. project/2. project-menu-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getListProjectMenu = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_project = String(req.query?.id_project);
    const result = await getListProjectMenuDto(id_project);
    successResponse({
      res,
      message: message?.success?.getData,
      data: result,
    });
  }
);

export const upsertProjectMenu = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertProjectMenuDto({
      ...payload,
      id_user: String(user?.id),
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(String(payload?.id)),
    });
  }
);
