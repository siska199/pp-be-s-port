import {
  createBulkMasterCategorySkillDto,
  createMasterCategorySkillDto,
  getListMasterCategorySkillDto,
} from "@1. dto/0.7 master-category-skill/master-category-skill-dto";
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

export const addMasterCategorySkill = catchErrors(async (req, res) => {
  const categorySkill = req.body;
  const result = await createMasterCategorySkillDto(categorySkill);

  successResponse({
    res,
    message: message.success.addData,
    data: result,
  });
});

export const addBulkMasterCategorySkill = catchErrors(async (req, res) => {
  const categoriesSkill = req.body;
  const result = await createBulkMasterCategorySkillDto(categoriesSkill);
  successResponse({
    res,
    message: message.success.addData,
    data: result,
  });
});
