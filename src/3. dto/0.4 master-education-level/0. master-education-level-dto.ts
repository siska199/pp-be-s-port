import prisma from "@_lib/db/prisma";
import { MasterEducationLevel } from "@prisma/client";

export const createMasterEducationLevelDto = async (
  params: MasterEducationLevel
) => {
  const result = await prisma?.masterEducationLevel.create({
    data: params,
  });

  return result ?? null;
};

export const createBulkMasterEducationLevelDto = async (
  params: MasterEducationLevel[]
) => {
  const data = params;
  const result = await prisma?.masterEducationLevel.createMany({
    data,
  });

  return result ?? null;
};

export const getListMasterEducationLevelDto = async () => {
  const result = await prisma.masterEducationLevel.findMany();
  return result ?? [];
};

export const getMasterEducationLevelDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterEducationLevel?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterEducationLevelDto = async (params: {
  id: string;
  data: MasterEducationLevel;
}) => {
  const { id, data } = params;
  const result = await prisma?.masterEducationLevel.update({
    where: {
      id,
    },
    data,
  });

  return result ?? null;
};

export const deleteMasterEducationLevelDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationLevel?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
