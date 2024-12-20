import { getListMasterPostalCodeDto } from "@2. dto/0.9.4 master-postal-code-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterPostalCode = catchErrors(async (req, res) => {
  const city_name = req.query.city_name as string;
  const district_name = req.query.district_name as string;
  const postalCodes = await getListMasterPostalCodeDto({
    district_name,
    city_name,
  });

  successResponse({
    res,
    data: postalCodes,
    message: message.success.getData,
  });
});
