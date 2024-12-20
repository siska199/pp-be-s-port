import CONFIG from "@_lib/config";

export const getListMasterCityDto = async (id_province: string) => {
  const response = await fetch(
    `${CONFIG.API_REGION}/regencies/${id_province}.json`
  );
  const data = await response.json();
  const dataDto = data.data?.map((city: { code: string; name: string }) => ({
    id: city.code,
    name: city?.name,
  }));
  return dataDto;
};
