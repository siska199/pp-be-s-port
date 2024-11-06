import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { getListPostalCode } from "@query/region/postal-code-query";


export const getPostalCodes = catchErrors(async (req, res) => {
  const districtName = req.query.district_name;
  const postalCodes = await getListPostalCode(districtName as string);

  successResponse({
    res,
    data: postalCodes,
    message: message.success.getData,
  });
});
