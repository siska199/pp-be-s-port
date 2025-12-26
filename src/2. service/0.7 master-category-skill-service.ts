import prisma from "@_db/prisma";
import masterCategorySkillSchema from "@1. validation/0.7 master-category-skill";
import {
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { MasterCategorySkill } from "@prisma/client";

export const getListMasterCategorySkillService = async () => {
  const result = await prisma.masterCategorySkill?.findMany();
  const resultDto = result?.map((data:MasterCategorySkill) => ({
    id: data?.id,
    name: data?.name,
  }));
  return result ? resultDto : [];
};

export const getMasterCategorySkillByIdService = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySkill?.findFirst({
    where: {
      id,
    },
  });
  const resultDto = {
    id: result?.id,
    name: result?.name,
  };
  return result ? resultDto : null;
};

export const createBulkMasterCategorySkillService = async (
  params: MasterCategorySkill[]
) => {
  const result = await prisma?.masterCategorySkill?.createMany({
    data: trimObject(params),
  });
  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertMasterCategorySkillService = async (
  params: MasterCategorySkill
) => {
  const id = params?.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    name: params?.name,
  });

  await validationParse({
    schema: masterCategorySkillSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma?.masterCategorySkill?.update({
        where: {
          id,
        },
        data: removeKeyWithUndifienedValue(dataDto),
      })
    : await prisma?.masterCategorySkill?.create({
        data: dataDto,
      });

  const resultDto = {
    id: result?.id,
    name: result?.name,
  };
  return result ? resultDto : null;
};

export const deleteMasterCategorySkillByIdService = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySkill?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
