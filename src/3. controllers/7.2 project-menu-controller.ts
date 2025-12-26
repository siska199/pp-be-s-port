import { deleteProjectByIdService } from "@2. service/7. project-service";
import {
  getListProjectMenuService,
  upsertProjectMenuService,
} from "@2. service/7.2 project-menu-service";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getListProjectMenu = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_project = String(req.query?.id_project);
    const result = await getListProjectMenuService(id_project);
    successResponse({
      res,
      message: message?.success?.getData,
      data: result,
    });
  }
);

export const upsertProjectMenu = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const payload = req.body;

    const result = await upsertProjectMenuService({
      ...payload,
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(String(payload?.id)),
    });
  }
);

export const deleteProjectMenuById = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;

    const result = await deleteProjectByIdService(id);

    successResponse({
      res,
      data: result,
      message: message.success.deleteData,
    });
  }
);
