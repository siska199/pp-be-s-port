import { getListMasterCityDto } from "@2. dto/0.9.2 master-city-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterCity = catchErrors(async (req, res) => {
  const provinceCode = req.query.province_code;
  const cities = await getListMasterCityDto(provinceCode as string);

  successResponse({
    res,
    data: cities,
    message: message.success.getData,
  });
});
