import { deleteEducationByIdDto } from "@2. dto/4. education-dto";
import {
  createBulkSkillUserDto,
  getListSkillUserDto,
  getSkillUserByIdDto,
  upsertSkillUserDto,
} from "@2. dto/6. skill-user-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute, Tsort_dir } from "@_lib/types";
import { Level, SkillUser } from "@prisma/client";
import { Response } from "express";

export const getListSkillUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      page_no: Number(req.query.page_no),
      items_perpage: Number(req.query.items_perpage),
      sort_by: req.query.sort_by as keyof SkillUser,
      sort_dir: req.query.sort_dir as Tsort_dir,
      id_skills: req.query.id_skills?.toString(),
      year_of_experiance: Number(req.query.year_of_experiance),
      level: req.query.level as Level,
      id_user: user?.id?.toString() || "",
    };

    const result = await getListSkillUserDto(queryObject);

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

    const result = await upsertSkillUserDto(payload);

    successResponse({
      message: message.success.upserData(payload.id),
      res,
      data: result,
    });
  }
);

export const createBulkSkillUser = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await createBulkSkillUserDto(payload);

  successResponse({
    res,
    data: result,
    message: message?.success?.addData,
  });
});

export const getSkillUserById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await getSkillUserByIdDto(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.getData,
  });
});

export const deleteSkillUserById = catchErrors(async (req, res) => {
  const id = req.params?.id;
  const result = await deleteEducationByIdDto(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.deleteData,
  });
});
