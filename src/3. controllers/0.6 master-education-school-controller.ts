import { createBulkMasterEducationLevelDto } from "@2. dto/0.4 master-education-level-dto";
import {
  getListMasterEducationSchoolDto,
  upsertMasterEducationSchoolByIdDto,
} from "@2. dto/0.6 master-education-school-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterEducationSchool = catchErrors(async (req, res) => {
  const id_level = req.query.id_level as string;
  const result = await getListMasterEducationSchoolDto({
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

  const result = await upsertMasterEducationSchoolByIdDto(payload);

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
