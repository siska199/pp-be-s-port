import { getUniqueListBy } from "@helpers/function";
import { getDistrictByCode } from "@query/district/district-query";

export const getListPostalCode = async (districtName: string) => {
  const data = await getDistrictByCode(districtName as string);
  console.log("data: ", data);
  return getUniqueListBy(data, "code");
};
