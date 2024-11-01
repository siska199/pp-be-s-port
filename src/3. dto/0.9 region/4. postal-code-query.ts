import { getUniqueListBy } from "@helpers/function";
import { getDistrictByCode } from "@query/region/district-query";

export const getListPostalCode = async (districtName: string) => {
  const data = await getDistrictByCode(districtName as string);
  return getUniqueListBy(data, "code");
};
