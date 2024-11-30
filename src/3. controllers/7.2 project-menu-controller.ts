import { deleteProjectByIdDto } from "@2. dto/7. project-dto";
import {
  getListProjectMenuDto,
  upsertProjectMenuDto,
} from "@2. dto/7.2 project-menu-dto";
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
    const payload = req.body;

    const result = await upsertProjectMenuDto({
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

    const result = await deleteProjectByIdDto(id);

    successResponse({
      res,
      data: result,
      message: message.success.deleteData,
    });
  }
);
