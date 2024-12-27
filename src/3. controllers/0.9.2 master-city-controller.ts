import { getListMasterCityDto } from "@2. dto/0.9.2 master-city-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterCity = catchErrors(async (req, res) => {
  const id_province = req.query.id_province as string;
  const cities = await getListMasterCityDto({ id_province });
  successResponse({
    res,
    data: cities,
    message: message.success.getData,
  });
});
