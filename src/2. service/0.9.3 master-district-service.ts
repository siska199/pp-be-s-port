import prisma from "../_db/prisma";
import { MasterDistrict } from "@prisma/client";

export const getListMasterDistrictService = async (params: { id_city: string }) => {
  const { id_city } = params;

  const districts = await prisma?.masterDistrict?.findMany({
    where: {
      ...(id_city && { id_city }),
    },
  });

  const resultDto = districts
    ? districts?.map((data:MasterDistrict) => ({
        id: data?.id,
        name: data?.name,
      }))
    : [];
    
  return resultDto;
};
