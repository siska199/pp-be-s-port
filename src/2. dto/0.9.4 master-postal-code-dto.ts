import prisma from "@0 db/prisma";

export const getListMasterPostalCodeDto = async (params: {
  id_district: string;
}) => {
  const { id_district } = params;
  const postalCodes = await prisma?.masterPostalCode.findMany({
    where: {
      ...(id_district && { id_district }),
    },
  });
  const resultDto = postalCodes
    ? postalCodes?.map((data) => ({
        id: data.id,
        name: data?.name,
        postal_code: data?.postal_code,
      }))
    : [];
  return resultDto;
};
