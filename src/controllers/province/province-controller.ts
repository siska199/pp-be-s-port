import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import { getListProvince } from "@query/region/province/province-query";

export const getProvinces = catchErrors(async (req, res) => {
  const provinces = await getListProvince();

  successResponse({
    res,
    data: provinces,
    message: message.success.getData,
  });
});
