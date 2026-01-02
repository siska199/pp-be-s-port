import {
  deleteProjectByIdService,
  getListProjectService,
  getProjectByIdService,
  TParamsListProjectDto,
  upsertProjectService,
} from "../2. service/7. project-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute, TSort_dir } from "../_lib/types";
import { CategoryProject, Project, TypeProject } from "@prisma/client";
import { Response } from "express";


export const mapProjectListQuery = (req:TRequestAuthRoute) => {
  return {
    page_no: req.query.page_no ? Number(req.query.page_no) : undefined,
    items_perpage: req.query.items_perpage
      ? Number(req.query.items_perpage)
      : undefined,
    sort_by: req.query.sort_by as keyof Project,
    sort_dir: req.query.sort_dir as TSort_dir,
    categories: req.query.categories as CategoryProject,
    types: req.query.types as TypeProject,
    id_skills: req.query.id_skills?.toString() || "",
    keyword: req.query.keyword?.toString() || "",
    id_user: req.user?.id || "",
    username : req.query.username?.toString(),
  }
}

export const getListProject = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const queryObject = mapProjectListQuery(req)

    const result = await getListProjectService({
      ...queryObject,
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
    const result = await upsertProjectService({
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

export const getProjectById = catchErrors(async (req, res) => {
  const id = req?.params?.id;

  const result = await getProjectByIdService(id);

  successResponse({
    res,
    data: result,
    message: message.success.getData,
  });
});

export const deleteProjectById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await deleteProjectByIdService(id);

  successResponse({
    res,
    data: result,
    message: message.success.deleteData,
  });
});
