import { getListMasterPostalCodeDto } from "@2. dto/0.9.4 master-postal-code-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterPostalCode = catchErrors(async (req, res) => {
  const id_district = req.query.id_district as string;
  const postalCodes = await getListMasterPostalCodeDto({
    id_district,
  });

  successResponse({
    res,
    data: postalCodes,
    message: message.success.getData,
  });
});
