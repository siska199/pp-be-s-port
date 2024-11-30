import {
  createBulkMasterEducationLevelDto,
  getListMasterEducationLevelDto,
} from "@1. dto/0.4 master-education-level-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { upsertMasterEducationLevelDto } from "../1. dto/0.4 master-education-level-dto";

export const getListMasterEducationLevel = catchErrors(async (req, res) => {
  const result = await getListMasterEducationLevelDto();

  successResponse({
    res,
    data: result,
    message: message.success.getData,
  });
});

export const upsertMasterEducationLevel = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await upsertMasterEducationLevelDto(payload);
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
