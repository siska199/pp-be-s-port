import { upsertProjectMenuDto } from "@1. dto/7.2 project-menu-dto";
import { getListProjectTechStackDto } from "@1. dto/7.4 project-tech-stack-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getListProjectTechStack = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_project = String(req.query.id_project);

    const result = await getListProjectTechStackDto(id_project);

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const upsertProjectTechStack = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const payload = req.body;

    const result = await upsertProjectMenuDto({
      ...payload,
    });

    successResponse({
      res,
      data: result,
      message: message?.success?.upserData(String(payload?.id)),
    });
  }
);
