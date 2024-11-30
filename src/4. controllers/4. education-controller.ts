import {
  deleteEducationByIdDto,
  getEducationByIdDto,
  getListEducationDto,
  TParamsListEducationDto,
  upsertEducationDto,
} from "@1. dto/4. education-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Education } from "@prisma/client";
import { Response } from "express";

export const getListEducation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject: TParamsListEducationDto = {
      page_no: Number(req.query.page_no),
      items_perpage: Number(req.query.items_perpage),
      sort_by: req.query.sort_by as keyof Education,
      sort_dir: req.query.sort_dir as "asc" | "desc",
      search: req.query.search?.toString() || "",
      id_level: req.query.id_level?.toString() || "",
      id_user: user?.id ?? "",
      start_at: req.query.start_at?.toString() || "",
      end_at: req.query.end_at?.toString() || "",
    };

    const result = await getListEducationDto({
      ...queryObject,
    });

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const getEducationById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await getEducationByIdDto(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.getData,
  });
});

export const upsertEducation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertEducationDto({
      ...payload,
      id_user: String(user?.id),
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload.id),
    });
  }
);

export const educationEducationById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await deleteEducationByIdDto(id);

  successResponse({
    res,
    message: message?.success?.deleteData,
    data: result,
  });
});
