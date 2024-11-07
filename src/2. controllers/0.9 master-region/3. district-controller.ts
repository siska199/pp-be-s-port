import { getListMasterDistrictDto } from "@3. dto/0.9 master-region/3. master-district-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";


export const getDistricts = catchErrors(async (req, res) => {
  const cityCode = req.query.city_code as string;

  const districts = await getListMasterDistrictDto(cityCode);

  successResponse({
    res,
    data: districts,
    message: message.success.getData,
  });
});
