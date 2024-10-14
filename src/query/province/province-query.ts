import CONFIG from "@config";

export const getListProvincce = async () => {
  const response = await fetch(`${CONFIG.API_REGION}/provinces.json`);
  const data = await response.json();
  return data.data;
};
