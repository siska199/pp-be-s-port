import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import {
  getListProfessions,
  insertBulkProfession,
} from "@query/profession/profession-query";
import { TRequestAuthRoute } from "@types";

export const getProfessions = catchErrors(async (req, res) => {
  const professions = await getListProfessions();
  successResponse({
    res,
    message: message.success.getData,
    data: professions,
  });
});

export const addBulkProfession = catchErrors<TRequestAuthRoute>(
  async (req, res) => {
    const professions = req.body;
    await insertBulkProfession(professions);
    successResponse({
      res,
      message: message.success.addData,
    });
  }
);
