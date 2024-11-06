import CONFIG from "@_lib/config";

export const getListProvinceDto = async (): Promise<
  { id: string; name: string }[]
> => {
  const response = await fetch(`${CONFIG.API_REGION}/provinces.json`);
  const data = await response.json();
  return data.data?.map((province: { code: string; name: string }) => ({
    id: province?.code,
    name: province?.name,
  }));
};
