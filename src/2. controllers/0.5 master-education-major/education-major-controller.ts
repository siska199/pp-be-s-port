import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import {
  getListMajor,
  getMajorById,
  insertBulkMajor,
  insertMajor,
} from "@query/education/education-major-query";

export const getMajors = catchErrors(async (req, res) => {
  const majors = await getListMajor();

  successResponse({
    res,
    data: majors,
    message: message.success.getData,
  });
});

export const getMajor = catchErrors(async (req, res) => {
  const id = req.params.id;
  const major = await getMajorById(id);

  successResponse({
    res,
    data: major,
    message: message?.success?.addData,
  });
});

export const addMajor = catchErrors(async (req, res) => {
  const paylaod = req.body;

  await insertMajor(paylaod);

  successResponse({
    res,
    message: message?.success?.addData,
  });
});

export const addBulkMajor = catchErrors(async (req, res) => {
  const payload = req.body;

  await insertBulkMajor(payload);

  successResponse({
    res,
    message: message?.success?.addData,
  });
});
