import prisma from "@0 db/prisma";
import masterEducationLevelSchema from "@2. validation/0.4 master-education-level/0. master-education-level-schema";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterEducationLevel } from "@prisma/client";

export const createMasterEducationLevelDto = async (
  params: MasterEducationLevel
) => {
  const dataDto = {
    name: params?.name,
  };
  await validationParse({
    schema: masterEducationLevelSchema,
    data: dataDto,
  });
  const result = await prisma?.masterEducationLevel.create({
    data: dataDto,
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
