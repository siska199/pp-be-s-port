import CONFIG from "@config";
import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import { getListDistrict } from "@query/district/district-query";

export const getDistricts = catchErrors(async (req, res) => {
  const cityCode = req.query.city_code as string;

  const districts = await getListDistrict(cityCode);

  successResponse({
    res,
    data: districts,
    message: message.success.getData,
  });
});
