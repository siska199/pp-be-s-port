import prisma from "@_lib/db/prisma";
import { MasterCompany } from "@prisma/client";

export const createDtoMasterCompany = async (params: MasterCompany) => {
  const { name } = params;
  const result = await prisma?.masterCompany?.create({
    data: {
      name,
    },
  });

  return result ?? null;
};

export const createDtoBulkMasterCompany = async (params: MasterCompany[]) => {
  const result = await prisma?.masterCompany?.createMany({
    data: params,
  });
  return result ?? null;
};

export const getDtoListMasterCompany = async () => {
  const result = await prisma.masterCompany?.findMany();
  return result ?? [];
};

export const getDtoMasterCompanyById = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateDtoMasterCompanyById = async (params: {
  id: string;
  data: MasterCompany;
}) => {
  const { id, data } = params;
  const result = await prisma?.masterCompany?.update({
    where: {
      id,
    },
    data,
  });
  return result ?? null;
};

export const deleteDtoMasterCompanyById = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.delete({
    where: {
      id,
    },
  });
  return result ?? null;
};
