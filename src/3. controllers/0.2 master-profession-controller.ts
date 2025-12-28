import {
  createBulkMasterProfessionService,
  deleteMasterProfessionByIdService,
  getListMasterProfessionService,
  upsertMasterProfessionService,
} from "../2. service/0.2 master-profession-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";

import { TRequestAuthRoute } from "../_lib/types";

export const getListMasterProfession = catchErrors(async (req, res) => {
  const result = await getListMasterProfessionService();
  successResponse({
    res,
    message: message.success.getData,
    data: result,
  });
});

export const upsertMasterProfession = catchErrors(async (req, res) => {
  const payload = req.body;

  const result = await upsertMasterProfessionService({ ...payload });

  successResponse({
    res,
    message: message.success.upserData(String(result?.id)),
    data: result,
  });
});

export const createBulkMasterProfession = catchErrors(async (req, res) => {
  const professions = req.body;
  const result = await createBulkMasterProfessionService(professions);
  successResponse({
    res,
    message: message.success.addData,
    data: result,
  });
});

export const deleteMasterProfessionById = catchErrors(
  async (req: TRequestAuthRoute, res) => {
    const id = req.params.id;
    const result = await deleteMasterProfessionByIdService(id);
    successResponse({
      res,
      message: message.success.deleteData,
      data: result,
    });
  }
);
