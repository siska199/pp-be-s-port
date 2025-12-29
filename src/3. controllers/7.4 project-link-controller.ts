import {
  deleteProjectLinkByIdService,
  getListProjectLinkService,
  upsertProjectLinkService,
} from "../2. service/7.4 project-link-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute } from "../_lib/types";
import { Response } from "express";


export const getListProjectLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_project = String(req.query?.id_project);

    const result = await getListProjectLinkService(id_project);

    successResponse({
      res,
      message: message.success.getData,
      data: result,
    });
  }
);


export const upsertProjectLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const payload = req.body;

    const result = await upsertProjectLinkService({
      ...payload,
    });

    successResponse({
      res,
      message: message.success.upserData(payload?.id),
      data: result,
    });
  }
);


export const deleteProjectLinkById = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;

    const result = await deleteProjectLinkByIdService(id);

    successResponse({
      res,
      data: result,
      message: message.success.deleteData,
    });
  }
);
