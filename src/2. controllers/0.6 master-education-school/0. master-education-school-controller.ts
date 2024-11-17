import catchErrors from "@_lib/helpers/catch-error";
import {
  createBulkMasterEducationSchoolDto,
  createMasterEducationSchoolDto,
  getListMasterEducationSchoolDto,
} from "@3. dto/0.6 master-education-school/0. master-education-school-dto";
import { successResponse } from "@_lib/helpers/response";
import message from "@_lib/helpers/message";

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
  const educationSchool = req.body;

  const result = await createMasterEducationSchoolDto(educationSchool);

  successResponse({
    res,
    data: result,
    message: message.success.addData,
  });
});
