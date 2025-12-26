import prisma from "@_db/prisma";
import masterEducationLevelSchema from "@1. validation/0.4 master-education-level-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";

import { MasterEducationLevel } from "@prisma/client";

export const getListMasterEducationLevelService = async () => {
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
  const resultDto = result?.map((data:MasterEducationLevel) => ({
    id: data?.id,
    name: data?.name,
  }));
  return result ? resultDto : [];
};

export const getMasterEducationLevelByIdService = async (param: string) => {
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

export const upsertMasterEducationLevelService = async (
  params: MasterEducationLevel
) => {
  const id = params?.id ?? "";

  const dataDto = {
    ...(id && { id }),
    name: params?.name,
  };

  await validationParse({
    schema: masterEducationLevelSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma?.masterEducationLevel?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id"],
        }),
      })
    : await prisma?.masterEducationLevel?.create({
        data: dataDto,
      });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const deleteMasterEducationLevelByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationLevel?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
