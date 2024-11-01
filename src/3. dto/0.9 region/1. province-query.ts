import CONFIG from "@config";
import { TOption } from "@types";

export const getListProvince = async () => {
  const response = await fetch(`${CONFIG.API_REGION}/provinces.json`);
  const data = await response.json();
  return data.data;
};

export const getProvinceByName = async (provinceName: string) => {
  const provinces = await getListProvince();
  const province = provinces?.filter(
    (data: TOption) => data?.name === provinceName
  )[0];

  return province;
};
