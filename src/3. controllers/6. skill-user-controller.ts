import { deleteEducationByIdService } from "../2. service/4. education-service";
import {
  createBulkSkillUserService,
  deleteSkillUserByIdService,
  getListSkillUserService,
  getSkillUserByIdService,
  upsertSkillUserService,
} from "../2. service/6. skill-user-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute, TSort_dir } from "../_lib/types";
import { Level, SkillUser } from "@prisma/client";
import { Response } from "express";

export const mapSkillUserListQuery = (req:TRequestAuthRoute) => {
  return {
      page_no: Number(req.query.page_no),
      items_perpage: Number(req.query.items_perpage),
      sort_by: req.query.sort_by as keyof SkillUser,
      sort_dir: req.query.sort_dir as TSort_dir,
      id_skills: req.query.id_skills?.toString(),
      years_of_experiance: Number(req.query.years_of_experiance),
      level: req.query.level as Level,
      id_user: req.user?.id?.toString() || "",
      username: req.query.username?.toString(),
      id_category: req.query.id_category?.toString() as string,
      keyword :req.query.keyword?.toString() as string,
  }
}

export const getListSkillUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const queryObject = mapSkillUserListQuery(req)
    const result = await getListSkillUserService(queryObject);
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
    const payload = {
      ...req.body,
      id_user: user?.id?.toString() || "",
    };

    const result = await upsertSkillUserService(payload);

    successResponse({
      message: message.success.upserData(payload.id),
      res,
      data: result,
    });
  }
);

export const createBulkSkillUser = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await createBulkSkillUserService(payload);

  successResponse({
    res,
    data: result,
    message: message?.success?.addData,
  });
});

export const getSkillUserById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await getSkillUserByIdService(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.getData,
  });
});

export const deleteSkillUserById = catchErrors(async (req, res) => {
  const id = req.params?.id;
  const result = await deleteSkillUserByIdService(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.deleteData,
  });
});
