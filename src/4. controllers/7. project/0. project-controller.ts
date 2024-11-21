import {
  getListProjectDto,
  upsertProjectDto,
} from "@1. dto/7. project/0. project-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute, TSortDir } from "@_lib/types";
import { CategoryProject, Project, TypeProject } from "@prisma/client";
import { Response } from "express";

export const getListProject = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      currentPage: Number(req.query.currentPage),
      totalItems: Number(req.query.totalItems),
      sortBy: req.query.sortBy as keyof Project,
      sortDir: req.query.sortDir as TSortDir,

      categories: req.query.categories as CategoryProject,
      types: req.query.types as TypeProject,
      id_skills: String(req.query.id_skills),
      search: String(req.query.search),
    };

    const result = await getListProjectDto({
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

export const upsertProject = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertProjectDto({
      ...payload,
      id_user: user?.id,
    });

    successResponse({
      res,
      message: message.success.upserData(payload?.id),
      data: result,
    });
  }
);
