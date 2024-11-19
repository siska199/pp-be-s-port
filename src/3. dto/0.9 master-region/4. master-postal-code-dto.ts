import { getMasterDistrictByCodeDto } from "@3. dto/0.9 master-region/3. master-district-dto";
import { getUniqueListBy } from "@_lib/helpers/function";

export const getListMasterPostalCodeDto = async (params: {
  district_name: string;
  city_name: string;
}) => {
  const { district_name, city_name } = params;
  const data = (
    await getMasterDistrictByCodeDto(district_name as string)
  )?.filter((data: any) =>
    city_name?.toLowerCase().includes(data?.city_name?.toLowerCase())
  );
  return getUniqueListBy(data, "id");
};
