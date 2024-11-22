import prisma from "@0 db/prisma";
import masterEducationLevelSchema from "@2. validation/0.4 master-education-level/0. master-education-level-schema";
import catchErrors from "@_lib/helpers/catch-error";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterEducationLevel } from "@prisma/client";

export const getListMasterEducationLevelDto = async () => {
  const result = await prisma.masterEducationLevel.findMany();
  return result ?? [];
};

export const getMasterEducationLevelByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterEducationLevel?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const createBulkMasterEducationLevelDto = async (
  params: MasterEducationLevel[]
) => {
  const listDataDto = params?.map((data) => ({
    name: data?.name,
  }));
  await Promise.all(
    listDataDto?.map(async (dataDto) => {
      await validationParse({
        schema: masterEducationLevelSchema,
        data: dataDto,
      });
    })
  );

  const result = await prisma?.masterEducationLevel.createMany({
    data: listDataDto,
  });

  return result ?? null;
};

export const upsertMasterEducationLevelDto = async (
  params: MasterEducationLevel
) => {
  const id = params?.id ?? "";

  const dataDto = {
    name: params?.name,
  };

  const result = await prisma?.masterEducationLevel?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });

  const masterEducationLevelDto = result;

  return result ? masterEducationLevelDto : null;
};

export const deleteMasterEducationLevelByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationLevel?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
