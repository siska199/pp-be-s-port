import {
  deleteExperianceByIdDto,
  getExperianceByIdDto,
  getListExperianceDto,
  upsertExperianceDto,
} from "@2. dto/5. experiance-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute, Tsort_dir } from "@_lib/types";
import { Experiance } from "@prisma/client";
import { Response } from "express";

export const getListExperiance = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const queryObject = {
      page_no: Number(req.query.page_no),
      items_perpage: Number(req.query.items_perpage),
      sort_by: (req.query.sort_by || "start_at") as keyof Experiance,
      sort_dir: (req.query.sort_dir || "desc") as Tsort_dir,
      search: req.query.search?.toString(),
      id_company: req.query.id_company?.toString(),
      id_description: req.query.id_description?.toString(),
      start_at: req.query.start_at?.toString(),
      end_at: req.query.end_at?.toString(),
      id_user: user?.id?.toString() || "",
    };

    const result = await getListExperianceDto(queryObject);

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

export const getExperianceById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await getExperianceByIdDto(id);

  successResponse({
    res,
    message: message.success.getData,
    data: result,
  });
});

export const deleteExperianceById = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await deleteExperianceByIdDto(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.editData,
  });
});
