import { getListMasterPostalCodeService } from "../2. service/0.9.4 master-postal-code-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";

export const getListMasterPostalCode = catchErrors(async (req, res) => {
  const id_district = req.query.id_district as string;
  const postalCodes = await getListMasterPostalCodeService({
    id_district,
  });

  successResponse({
    res,
    data: postalCodes,
    message: message.success.getData,
  });
});
