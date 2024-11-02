import prisma from "@_lib/db/prisma";
import { MasterCompany } from "@prisma/client";

export const createMasterCompanyDto = async (params: MasterCompany) => {
  const { name } = params;
  const result = await prisma?.masterCompany?.create({
    data: {
      name,
    },
  });

  return result ?? null;
};

export const createBulkMasterCompanyDto = async (params: MasterCompany[]) => {
  const result = await prisma?.masterCompany?.createMany({
    data: params,
  });
  return result ?? null;
};

export const getListMasterCompanyDto = async () => {
  const result = await prisma.masterCompany?.findMany();
  return result ?? [];
};

export const getMasterCompanyByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterCompanyByIdDto = async (params: {
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

export const deleteMasterCompanyByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.delete({
    where: {
      id,
    },
  });
  return result ?? null;
};
