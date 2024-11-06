import prisma from "@_lib/db/prisma";
import { MasterCategorySkill } from "@prisma/client";

export const createMasterCategorySkillDto = async (
  params: MasterCategorySkill
) => {
  const { name } = params;
  const result = await prisma?.masterCategorySkill?.create({
    data: {
      name,
    },
  });

  return result ?? null;
};

export const createBulkMasterCategorySkillDto = async (
  params: MasterCategorySkill[]
) => {
  const result = await prisma?.masterCategorySkill?.createMany({
    data: params,
  });
  return result ?? null;
};

export const getListMasterCategorySkillDto = async () => {
  const result = await prisma.masterCategorySkill?.findMany();
  return result ?? [];
};

export const getMasterCategorySkillByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySkill?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterCategorySkillByIdDto = async (params: {
  id: string;
  data: MasterCategorySkill;
}) => {
  const { id, data } = params;
  const result = await prisma?.masterCategorySkill?.update({
    where: {
      id,
    },
    data,
  });
  return result ?? null;
};

export const deleteMasterCategorySkillByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySkill?.delete({
    where: {
      id,
    },
  });
  return result ?? null;
};
