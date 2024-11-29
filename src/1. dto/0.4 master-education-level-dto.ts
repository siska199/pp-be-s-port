import prisma from "@0 db/prisma";
import masterEducationLevelSchema from "@2. validation/0.4 master-education-level-schema";
import { validationParse } from "@_lib/helpers/function";

import { MasterEducationLevel } from "@prisma/client";

export const getListMasterEducationLevelDto = async () => {
  const result = await prisma.masterEducationLevel.findMany({
    include: {
      education_schools: true,
      majors: {
        include: {
          major: true,
        },
      },
    },
  });
  const resultDto = result?.map((data) => ({
    id: data?.id,
    name: data?.name,
  }));
  return result ? resultDto : [];
};

export const getMasterEducationLevelByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterEducationLevel?.findFirst({
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

export const createBulkMasterEducationLevelDto = async (
  params: MasterEducationLevel[]
) => {
  const listDataDto = params?.map((data) => ({
    name: data?.name,
  }));
  await Promise.all(
    listDataDto?.map(async (dataDto) => {
      await validationParse({
        schema: masterEducationLevelSchema(),
        data: dataDto,
      });
    })
  );

  const result = await prisma?.masterEducationLevel.createMany({
    data: listDataDto,
  });

  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertMasterEducationLevelDto = async (
  params: MasterEducationLevel
) => {
  const id = params?.id ?? "";

  const dataDto = {
    name: params?.name,
  };

  await validationParse({
    schema: masterEducationLevelSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.masterEducationLevel?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });

  const resultDto = result;

  return result ? resultDto : null;
};

export const deleteMasterEducationLevelByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationLevel?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};