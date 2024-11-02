import prisma from "@_lib/db/prisma";
import { MasterProfession } from "@prisma/client";

export const createMasterProfessionDto = async (params: MasterProfession) => {
  const result = await prisma?.masterProfession.create({
    data: params,
  });

  return result ?? null;
};

export const createBulkMasterProfessionDto = async (
  params: MasterProfession[]
) => {
  const data = params;
  const result = await prisma?.masterProfession.createMany({
    data,
  });

  return result ?? null;
};

export const getListMasterProfessionDto = async () => {
  const result = await prisma.masterProfession.findMany();
  return result ?? [];
};

export const getMasterProfessionDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterProfessionDto = async (params: {
  id: string;
  data: MasterProfession;
}) => {
  const { id, data } = params;
  const result = await prisma?.masterProfession.update({
    where: {
      id,
    },
    data,
  });

  return result ?? null;
};

export const deleteMasterProfessionDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterProfession?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
