
import { deleteKeyMetricByIdService, getListKeyMetricService, upsertBulkKeyMetricService, upsertKeyMetricService } from "@2. service/2.1 key-metric";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { KeyMetric } from "@prisma/client";
import { Response } from "express";

export const getListKeyMetric = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;

    const result = await getListKeyMetricService({
      id_user: String(user?.id),
    });
    successResponse({
      res,
      data: result,
      message: "Success Get Key Metric User",
    });
  }
);

export const upsertKeyMetric = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertKeyMetricService({
      ...payload,
      id_user: user?.id,
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload.id),
    });
  }
);

export const upsertBulkKeyMetric = catchErrors(
  async (req: TRequestAuthRoute, res) => {
    const payload = req.body;
    const id_user = req.user?.id;
    const result = await upsertBulkKeyMetricService(
      payload?.map((data: Omit<KeyMetric, "created_at" | "updated_at">) => ({
        ...data,
        id_user,
      }))
    );

    successResponse({
      res,
      data: result,
      message: message?.success?.addData,
    });
  }
);

export const deleteKeyMetric = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await deleteKeyMetricByIdService(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.deleteData,
  });
});
