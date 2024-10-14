import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import { getListPostalCode } from "@query/postal-code/postal-code-query";

export const getPostalCodes = catchErrors(async (req, res) => {
  const districtName = req.query.district_name;
  const postalCodes = await getListPostalCode(districtName as string);

  successResponse({
    res,
    data: postalCodes,
    message: message.success.getData,
  });
});
