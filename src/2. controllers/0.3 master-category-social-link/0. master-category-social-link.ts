import {
  createBulkMasterCategorySocialLinkDto,
  getListMasterCategorySocialLinkDto,
} from "@3. dto/0.3 master-category-social-link-category/0. master-category-social-link-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

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
    const result = await createBulkMasterCategorySocialLinkDto(categorySocialLinks);
    successResponse({
      res,
      message: message.success.addData,
      data :result
    });
  }
);
