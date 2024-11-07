import { getListMasterPostalCodeDto } from "@3. dto/0.9 master-region/4. master-postal-code-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";


export const getListMasterPostalCode = catchErrors(async (req, res) => {
  const districtName = req.query.district_name;
  const postalCodes = await getListMasterPostalCodeDto(districtName as string);

  successResponse({
    res,
    data: postalCodes,
    message: message.success.getData,
  });
});
