import { getListMasterDistrictService } from "@2. service/0.9.3 master-district-service";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

export const getListMasterDistrict = catchErrors(async (req, res) => {
  const id_city = req.query.id_city as string;

  const districts = await getListMasterDistrictService({ id_city });

  successResponse({
    res,
    data: districts,
    message: message.success.getData,
  });
});
