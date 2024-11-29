import { getListMasterProvinceDto } from "@1. dto/0.9.1 master-province-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterProvince = catchErrors(async (req, res) => {
  const provinces = await getListMasterProvinceDto();

  successResponse({
    res,
    data: provinces,
    message: message.success.getData,
  });
});
