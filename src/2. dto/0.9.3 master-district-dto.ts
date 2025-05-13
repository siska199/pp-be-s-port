import prisma from "@_db/prisma";

export const getListMasterDistrictDto = async (params: { id_city: string }) => {
  const { id_city } = params;

  const districts = await prisma?.masterDistrict?.findMany({
    where: {
      ...(id_city && { id_city }),
    },
  });

  const resultDto = districts
    ? districts?.map((data) => ({
        id: data?.id,
        name: data?.name,
      }))
    : [];
    
  return resultDto;
};
