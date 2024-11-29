import { getListProjectDto, upsertProjectDto } from "@1. dto/7. project-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute, Tsort_dir } from "@_lib/types";
import { CategoryProject, Project, TypeProject } from "@prisma/client";
import { Response } from "express";

export const getListProject = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      current_page: Number(req.query.current_page),
      total_items: Number(req.query.total_items),
      sort_by: req.query.sort_by as keyof Project,
      sort_dir: req.query.sort_dir as Tsort_dir,

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
