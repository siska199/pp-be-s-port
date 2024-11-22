import prisma from "@0 db/prisma";
import { MasterSkill } from "@prisma/client";

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

export const createBulkMasterSkillDto = async (params: MasterSkill[]) => {
  const data = params;

  const result = await prisma?.masterSkill?.createMany({
    data,
  });

  return result ?? null;
};

export const upsertMasterSkillDto = async (params: MasterSkill) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
    image: params?.image,
    color: params?.color,
    id_category: params?.id_category?.trim(),
  };
  const result = await prisma?.masterSkill?.upsert({
    where: { id },
    create: dataDto,
    update: dataDto,
  });

  const masterSkillDto = result;
  return result ? masterSkillDto : null;
};

export const deleteMasterSkillByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.delete({
    where: { id },
  });

  return result ?? null;
};
