import prisma from "@0 db/prisma";
import { MasterCategorySkill } from "@prisma/client";

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

export const createBulkMasterCategorySkillDto = async (
  params: MasterCategorySkill[]
) => {
  const result = await prisma?.masterCategorySkill?.createMany({
    data: params,
  });
  return result ?? null;
};

export const upsertMasterCategorySkillDto = async (
  params: MasterCategorySkill
) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
  };
  const result = await prisma?.masterCategorySkill?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });

  const masterCategorySkill = result;
  return result ? masterCategorySkill : null;
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
