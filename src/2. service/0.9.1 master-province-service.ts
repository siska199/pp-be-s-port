import prisma from "@_db/prisma";
import { MasterProvince } from "@prisma/client";

export const getListMasterProvinceService = async (): Promise<
  { id: string; name: string }[]
> => {
  const provinces = await prisma?.masterProvince?.findMany();

  const resultDTO = provinces
    ? provinces?.map((data:MasterProvince) => ({
        id: data?.id,
        name: data?.name,
      }))
    : [];
  return resultDTO;
};
