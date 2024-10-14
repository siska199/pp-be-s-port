import CONFIG from "@config";
import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import { getListProvincce } from "@query/province/province-query";

export const getProvinces = catchErrors(async (req, res) => {
  const provinces = await getListProvincce();

  successResponse({
    res,
    data: provinces,
    message: message.success.getData,
  });
});
