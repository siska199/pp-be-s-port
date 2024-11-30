import {
  createBulkMasterEducationMajorDto,
  getListMasterEducationMajorDto,
  getMasterEducationMajorByIdDto,
  upsertMasterEducationMajorByIdDto,
} from "@2. dto/0.5 master-education-major-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterEducationMajor = catchErrors(async (req, res) => {
  const { id_level } = req.query;
  const majors = await getListMasterEducationMajorDto({
    id_level: id_level as string,
  });

  successResponse({
    res,
    data: majors,
    message: message.success.getData,
  });
});

export const getMasterEducationMajorById = catchErrors(async (req, res) => {
  const id = req.params.id;
  const major = await getMasterEducationMajorByIdDto(id);

  successResponse({
    res,
    data: major,
    message: message?.success?.addData,
  });
});

export const createBulkMasterEducationMajor = catchErrors(async (req, res) => {
  const payload = req.body;
  const result = await createBulkMasterEducationMajorDto(payload);

  successResponse({
    res,
    message: message?.success?.addData,
    data: result,
  });
});

export const upsertMasterEducationMajor = catchErrors(async (req, res) => {
  const paylaod = req.body;
  const result = await upsertMasterEducationMajorByIdDto(paylaod);
  successResponse({
    res,
    message: message?.success?.addData,
    data: result,
  });
});
