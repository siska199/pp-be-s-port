import {
  createBulkMasterCategorySocialLinkDto,
  getListMasterCategorySocialLinkDto,
} from "@2. dto/0.3 master-category-social-link-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { upsertMasterCategorySocialLinkDto } from "@2. dto/0.3 master-category-social-link-dto";
import { deleteMasterCategorySkillByIdDto } from "@2. dto/0.7 master-category-skill-dto";

export const getListMasterCategorySocialLink = catchErrors(async (req, res) => {
  const result = await getListMasterCategorySocialLinkDto();

  successResponse({
    data: result,
    res,
    message: message.success.getData,
  });
});

export const createBulkMasterCategorySocialLink = catchErrors(
  async (req, res) => {
    const categorySocialLinks = req.body;
    const result = await createBulkMasterCategorySocialLinkDto(
      categorySocialLinks
    );
    successResponse({
      res,
      message: message.success.addData,
      data: result,
    });
  }
);

export const upsertMasterCategorySocialLink = catchErrors(async (req, res) => {
  const payload = req.body;

  const result = await upsertMasterCategorySocialLinkDto({
    ...payload,
  });

  successResponse({
    res,
    data: result,
    message: message.success.addData,
  });
});

export const deleteMasterCategorySocialLinkById = catchErrors(
  async (req, res) => {
    const id = req.params?.id;

    const result = await deleteMasterCategorySkillByIdDto(id);

    successResponse({
      res,
      data: result,
      message: message?.success?.deleteData,
    });
  }
);
