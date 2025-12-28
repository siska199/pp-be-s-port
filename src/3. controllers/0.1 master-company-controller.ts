import {
  deleteMasterCompanyByIdService,
  getListMasterCompanyService,
  upsertMasterCompanyService,
} from "../2. service/0.1 master-company-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { CustomError } from "../_lib/middleware/error-handler";
import { Request, Response } from "express";

export const getListMasterCompany = catchErrors(
  async (_req: Request, res: Response) => {
    const result = await getListMasterCompanyService();
    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const upsertMasterCompany = catchErrors(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await upsertMasterCompanyService({
      ...payload,
    });
    if (!result) throw new CustomError(message.error.notFound, 400);

    successResponse({
      res,
      data: result,
      message: message?.success?.editData,
    });
  }
);

export const deleteMasterComapnyById = catchErrors(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await deleteMasterCompanyByIdService(id);
    if (!result) throw new CustomError(message.error.notFound, 400);

    successResponse({
      res,
      data: result,
      message: message?.success?.deleteData,
    });
  }
);
