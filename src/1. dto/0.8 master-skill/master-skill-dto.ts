import prisma from "@0 db/prisma";
import { MasterSkill } from "@prisma/client";

export const createMasterSkillDto = async (params: MasterSkill) => {
  const data = params;
  const dataDto = {
    name: data.name?.trim(),
    color: data.color?.trim(),
    id_category: data.id_category?.trim(),
    image: data.image?.trim(),
  };

  const result = await prisma?.masterSkill?.create({
    data: dataDto,
  });

  return result ?? null;
};

export const createBulkMasterSkillDto = async (params: MasterSkill[]) => {
  const data = params;

  const result = await prisma?.masterSkill?.createMany({
    data,
  });

  return result ?? null;
};

export const getListMasterSkillDto = async (params: {
  id_category?: string;
}) => {
  const { id_category } = params;
  const result = await prisma?.masterSkill?.findMany({
    where: {
      ...(id_category && { id_category }),
    },
  });

  return result ?? [];
};

export const getMasterSkillByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.findUnique({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterSkillByIdDto = async (params: {
  id: string;
  data: MasterSkill;
}) => {
  const { id, data } = params;

  const result = await prisma?.masterSkill?.update({
    where: { id },
    data: {
      ...data,
    },
  });
  return result ?? null;
};

export const deleteMasterSkillDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.delete({
    where: { id },
  });

  return result ?? null;
};
