import {
  getListEducationDto,
  upsertEducationDto,
} from "@1. dto/4. education/education-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Education } from "@prisma/client";
import { Response } from "express";

export const getListEducation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      currentPage: Number(req.query.currentPage),
      totalItems: Number(req.query.totalItems),
      sortBy: req.query.sortBy as keyof Education,
      sortDir: req.query.sortDir as "asc" | "desc",
      search: String(req.query.search) || "",
      id_level: String(req.query.id_level) || "",
    };

    const result = await getListEducationDto({
      ...queryObject,
      id_user: user?.id || "",
    });

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const upsertEducation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertEducationDto({
      ...payload,
      id_user: user?.id || "",
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload.id),
    });
  }
);
