import {
  deleteProjectResponsibilityByIdService,
  getListProjectResponsibilityService,
  upsertProjectResponsibilityService,
} from "../2. service/7.1 project-responsibility-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute } from "../_lib/types";
import { Response } from "express";

export const getListProjectResponsibility = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_project = String(req.query?.id_project);

    const result = await getListProjectResponsibilityService(id_project);

    successResponse({
      res,
      message: message?.success?.getData,
      data: result,
    });
  }
);

export const upsertProjectResponsibility = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const result = await upsertProjectResponsibilityService({
      ...payload,
      id_user: String(user?.id),
    });

    successResponse({
      message: message.success.upserData(payload?.id),
      res,
      data: result,
    });
  }
);

export const deleteProjectResponsibilityById = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;

    const result = await deleteProjectResponsibilityByIdService(id);

    successResponse({
      res,
      data: result,
      message: message.success.deleteData,
    });
  }
);