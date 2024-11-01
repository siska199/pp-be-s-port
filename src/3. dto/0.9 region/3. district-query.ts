import CONFIG from "@config";

export const getListDistrict = async (cityCode: string) => {
  const response = await fetch(
    `${CONFIG.API_REGION}/districts/${cityCode}.json`
  );
  const data = await response.json();
  return data.data;
};

export const getDistrictByCode = async (districtName: string) => {
  const response = await fetch(
    `${CONFIG.API_POSTCODE_ID}/district-postcode-json/${districtName}`
  );

  const data = await response?.json();
  const refactoData = data?.nodes?.map((district: any) => ({
    code: district.node.Postcode,
    name: district.node.Location,
  }));

  return refactoData;
};
