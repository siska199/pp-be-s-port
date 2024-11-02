import { getDistrictByCodeDto } from "@3. dto/0.9 master-region/3. master-district-dto";
import { getUniqueListBy } from "@_lib/helpers/function";

export const getListPostalCode = async (id_district: string) => {
  const data = await getDistrictByCodeDto(id_district as string);
  return getUniqueListBy(data, "id");
};
