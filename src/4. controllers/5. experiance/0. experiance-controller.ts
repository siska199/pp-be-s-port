import {
  getListExperianceDto,
  upsertExperianceDto,
} from "@1. dto/5. experiance/0. experiance-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute, TSortDir } from "@_lib/types";
import { Experiance } from "@prisma/client";
import { Response } from "express";

export const getListExperiance = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      currentPage: Number(req.query.currentPage),
      totalItems: Number(req.query.totalItems),
      sortBy: req.query.sortBy as keyof Experiance,
      sortDir: req.query.sortDir as TSortDir,
      search: String(req.query.search),
      id_company: String(req.query.id_company),
      id_description: String(req.query.id_description),
      start_at: String(req.query.start_at),
      end_at: String(req.query.end_at),
    };

    const result = await getListExperianceDto({
      ...queryObject,
      id_user: String(user?.id),
    });

    successResponse({
      res,
      message: message.success.getData,
      data: result,
    });
  }
);

export const upsertExperiance = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertExperianceDto({
      ...payload,
      id_user: String(user?.id),
    });
    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload?.id),
    });
  }
);
