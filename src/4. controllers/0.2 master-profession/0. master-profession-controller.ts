import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import {
  deleteMasterProfessionByIdDto,
  upsertMasterProfessionDto,
} from "../../1. dto/0.2 master-profession/0. master-profession-dto";
import {
  createBulkMasterProfessionDto,
  getListMasterProfessionDto,
} from "@1. dto/0.2 master-profession/0. master-profession-dto";
import { TRequestAuthRoute } from "@_lib/types";

export const getListMasterProfession = catchErrors(async (req, res) => {
  const result = await getListMasterProfessionDto();
  successResponse({
    res,
    message: message.success.getData,
    data: result,
  });
});

export const upsertMasterProfession = catchErrors(async (req, res) => {
  const payload = req.body;

  const result = await upsertMasterProfessionDto({ ...payload });

  successResponse({
    res,
    message: message.success.upserData(String(result?.id)),
    data: result,
  });
});

export const createBulkMasterProfession = catchErrors(async (req, res) => {
  const professions = req.body;
  const result = await createBulkMasterProfessionDto(professions);
  successResponse({
    res,
    message: message.success.addData,
    data: result,
  });
});

export const deleteMasterProfessionById = catchErrors(
  async (req: TRequestAuthRoute, res) => {
    const id = req.params.id;
    const result = await deleteMasterProfessionByIdDto(id);
    successResponse({
      res,
      message: message.success.deleteData,
      data: result,
    });
  }
);
