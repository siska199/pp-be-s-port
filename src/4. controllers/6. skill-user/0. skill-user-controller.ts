import {
  getListSkillUserDto,
  upsertSkillUserDto,
} from "@1. dto/6. skill-user/0. skill-user-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute, TSortDir } from "@_lib/types";
import { Level, SkillUser } from "@prisma/client";
import { Response } from "express";

export const getListSkillUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      currentPage: Number(req.query.currentPage),
      totalItems: Number(req.query.totalItems),
      sortBy: req.query.sortBy as keyof SkillUser,
      sortDir: req.query.sortDir as TSortDir,
      id_skills: String(req.query.id_skills),
      year_of_experiance: Number(req.query.year_of_experiance),
      level: req.query.level as Level,
    };

    const result = await getListSkillUserDto({
      ...queryObject,
      id_user: String(user?.id),
    });

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const upsertSkillUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertSkillUserDto({
      ...payload,
      id_user: String(user?.id),
    });

    successResponse({
      message: message.success.upserData(payload.id),
      res,
      data: result,
    });
  }
);