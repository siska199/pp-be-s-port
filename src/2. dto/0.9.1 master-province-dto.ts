import prisma from "@_db/prisma";

export const getListMasterProvinceDto = async (): Promise<
  { id: string; name: string }[]
> => {
  const provinces = await prisma?.masterProvince?.findMany();

  const resultDTO = provinces
    ? provinces?.map((data) => ({
        id: data?.id,
        name: data?.name,
      }))
    : [];
  return resultDTO;
};
