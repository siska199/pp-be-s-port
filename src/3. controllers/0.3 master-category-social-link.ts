import {
  createBulkMasterCategorySocialLinkService,
  getListMasterCategorySocialLinkService,
} from "../2. service/0.3 master-category-social-link-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { upsertMasterCategorySocialLinkService } from "../2. service/0.3 master-category-social-link-service";
import { deleteMasterCategorySkillByIdService } from "../2. service/0.7 master-category-skill-service";

export const getListMasterCategorySocialLink = catchErrors(async (req, res) => {
  const result = await getListMasterCategorySocialLinkService();

  successResponse({
    data: result,
    res,
    message: message.success.getData,
  });
});

export const createBulkMasterCategorySocialLink = catchErrors(
  async (req, res) => {
    const categorySocialLinks = req.body;
    const result = await createBulkMasterCategorySocialLinkService(
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

  const result = await upsertMasterCategorySocialLinkService({
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

    const result = await deleteMasterCategorySkillByIdService(id);

    successResponse({
      res,
      data: result,
      message: message?.success?.deleteData,
    });
  }
);
