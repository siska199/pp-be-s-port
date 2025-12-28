import { createBulkMasterEducationLevelDto } from "../2. service/0.4 master-education-level-service";
import {
  getListMasterEducationSchoolService,
  upsertMasterEducationSchoolByIdService,
} from "../2. service/0.6 master-education-school-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";

export const getListMasterEducationSchool = catchErrors(async (req, res) => {
  const id_level = req.query.id_level as string;
  const result = await getListMasterEducationSchoolService({
    id_level: id_level ?? "",
  });
  successResponse({
    res,
    data: result,
    message: message.success.getData,
  });
});

export const upsertMasterEducationSchool = catchErrors(async (req, res) => {
  const payload = req.body;

  const result = await upsertMasterEducationSchoolByIdService(payload);

  successResponse({
    res,
    data: result,
    message: message.success.addData,
  });
});

export const createBulkMasterEducationSchool = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await createBulkMasterEducationLevelDto(payload);

  successResponse({
    res,
    data: result,
    message: message?.success?.getData,
  });
});
