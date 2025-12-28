import {
  createBulkMasterEducationLevelDto,
  getListMasterEducationLevelService,
  upsertMasterEducationLevelService,
} from "../2. service/0.4 master-education-level-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";

export const getListMasterEducationLevel = catchErrors(async (req, res) => {
  const result = await getListMasterEducationLevelService();

  successResponse({
    res,
    data: result,
    message: message.success.getData,
  });
});

export const upsertMasterEducationLevel = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await upsertMasterEducationLevelService(payload);
  successResponse({
    res,
    data: result,
    message: message.success.getData,
  });
});

export const createBulkMasterEducationLevel = catchErrors(async (req, res) => {
  const payload = req.body;

  const result = await createBulkMasterEducationLevelDto(payload);

  successResponse({
    res,
    data: result,
    message: message.success.addData,
  });
});
