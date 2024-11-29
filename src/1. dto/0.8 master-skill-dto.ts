import prisma from "@0 db/prisma";
import masterSkillSchema from "@2. validation/0.8 master-skill-schema";
import {
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
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

  const resultDto = result;
  return result ? resultDto : [];
};

export const getMasterSkillByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.findUnique({
    where: {
      id,
    },
  });
  const reusltDto = result;
  return result ? reusltDto : null;
};

export const createBulkMasterSkillDto = async (params: MasterSkill[]) => {
  const data = params;

  const result = await prisma?.masterSkill?.createMany({
    data,
  });

  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertMasterSkillDto = async (params: MasterSkill) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
    image: params?.image,
    color: params?.color,
    id_category: params?.id_category?.trim(),
  };

  await validationParse({
    schema: masterSkillSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.masterSkill?.upsert({
    where: { id },
    create: dataDto,
    update: removeKeyWithUndifienedValue(dataDto),
  });

  const resultDto = result;

  return result ? resultDto : null;
};

export const deleteMasterSkillByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.delete({
    where: { id },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
