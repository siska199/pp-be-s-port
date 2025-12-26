import prisma from "@_db/prisma";
import { MasterPostalCode } from "@prisma/client";

export const getListMasterPostalCodeService = async (params: {
  id_district: string;
}) => {
  const { id_district } = params;
  const postalCodes = await prisma?.masterPostalCode.findMany({
    where: {
      ...(id_district && { id_district }),
    },
  });
  const resultDto = postalCodes
    ? postalCodes?.map((data:MasterPostalCode) => ({
        id: data.id,
        name: data?.name,
        postal_code: data?.postal_code,
      }))
    : [];
  return resultDto;
};
