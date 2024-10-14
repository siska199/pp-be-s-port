import CONFIG from "@config";
import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import { getListCity } from "@query/region/city/city-query";

export const getCities = catchErrors(async (req, res) => {
  const provinceCode = req.query.province_code;
  const cities = await getListCity(provinceCode as string);

  successResponse({
    res,
    data: cities,
    message: message.success.getData,
  });
});
