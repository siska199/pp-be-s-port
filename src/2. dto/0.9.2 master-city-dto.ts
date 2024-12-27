import prisma from "@0 db/prisma";

export const getListMasterCityDto = async (params: { id_province: string }) => {
  const { id_province } = params;

  console.log(id_province);
  const cities = await prisma?.masterCity?.findMany({
    where: {
      ...(id_province && { id_province }),
    },
  });

  const resultDto = cities
    ? cities?.map((data) => ({
        id: data?.id,
        name: data?.name,
      }))
    : [];
  return resultDto;
};
