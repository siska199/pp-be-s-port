import CONFIG from "@_lib/config";

export const getListMasterDistrictDto = async (id_city: string) => {
  const response = await fetch(
    `${CONFIG.API_REGION}/districts/${id_city}.json`
  );
  const data = await response.json();
  return data.data?.map((district: { code: string; name: string }) => ({
    id: district?.name,
    name: district?.name,
  }));
};

export const getMasterDistrictByCodeDto = async (id_district: string) => {
  const response = await fetch(
    `${CONFIG.API_POSTCODE_ID}/district-postcode-json/${id_district}`
  );

  const data = await response?.json();
  const refactoData = data?.nodes?.map((district: any) => ({
    id: district.node.Postcode,
    name: district.node.Postcode,
    city_name: district?.node?.Regency,
  }));

  return refactoData;
};
