import CONFIG from "@config";

export const getListCity = async (provinceCode: string) => {
  const response = await fetch(
    `${CONFIG.API_REGION}/regencies/${provinceCode}.json`
  );
  const data = await response.json();
  return data.data;
};
