import {
  createBulkMasterEducationLevelDto,
  getListMasterEducationLevelDto,
} from "@3. dto/0.4 master-education-level/0. master-education-level-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterEducationLevel = catchErrors(async (req, res) => {
  const result = await getListMasterEducationLevelDto();

  successResponse({
    res,
    data: result,
    message: message.success.getData,
  });
});

export const addBulkMasterEducationLevel = catchErrors(async (req, res) => {
  const educationLevels = req.body;

  const result = await createBulkMasterEducationLevelDto(educationLevels);

  successResponse({
    res,
    data: result,
    message: message.success.addData,
  });
});
