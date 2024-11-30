import {
  createBulkMasterCategorySkillDto,
  getListMasterCategorySkillDto,
  upsertMasterCategorySkillDto,
} from "@2. dto/0.7 master-category-skill-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListmasterCategorySkill = catchErrors(async (req, res) => {
  const cotegoriesSkill = await getListMasterCategorySkillDto();
  successResponse({
    res,
    data: cotegoriesSkill,
    message: message.success.getData,
  });
});

export const upsertMasterCategorySkill = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await upsertMasterCategorySkillDto(payload);

  successResponse({
    res,
    message: message.success.addData,
    data: result,
  });
});

export const createBulkMasterCategorySkill = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await createBulkMasterCategorySkillDto(payload);
  successResponse({
    res,
    message: message.success.addData,
    data: result,
  });
});
