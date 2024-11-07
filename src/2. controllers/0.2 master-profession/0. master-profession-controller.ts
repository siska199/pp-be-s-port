import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import {
  createBulkMasterProfessionDto,
  getListMasterProfessionDto,
} from "@3. dto/0.2 master-profession/0. master-profession-dto";

export const getListMasterProfession = catchErrors(async (req, res) => {
  const professions = await getListMasterProfessionDto();
  successResponse({
    res,
    message: message.success.getData,
    data: professions,
  });
});

export const addBulkMasterProfession = catchErrors(async (req, res) => {
  const professions = req.body;
  const result =await createBulkMasterProfessionDto(professions);
  successResponse({
    res,
    message: message.success.addData,
    data: result
  });
});
