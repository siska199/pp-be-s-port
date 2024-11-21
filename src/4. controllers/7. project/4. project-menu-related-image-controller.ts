import {
  getListProjectMenuRelatedImageDto,
  upsertProjectMenuRelatedImageDto,
} from "@1. dto/7. project/3. project-related-image-menu-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getListProjectMenuRelatedImageMenu = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_project_menu = String(req.query?.id_project_menu);
    const result = await getListProjectMenuRelatedImageDto(id_project_menu);
    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const upasertProjectMenuRelatedImage = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const payload = req.body;

    const result = await upsertProjectMenuRelatedImageDto({
      ...payload,
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload?.id),
    });
  }
);
