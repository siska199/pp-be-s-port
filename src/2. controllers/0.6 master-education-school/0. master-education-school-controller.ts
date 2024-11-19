import {
  createMasterEducationSchoolDto,
  getListMasterEducationSchoolDto,
} from "@3. dto/0.6 master-education-school/0. master-education-school-dto";
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

export const addMasterEducationSchool = catchErrors(async (req, res) => {
  const payload = req.body;

  const result = await createMasterEducationSchoolDto(payload);

  successResponse({
    res,
    data: result,
    message: message.success.addData,
  });
});
