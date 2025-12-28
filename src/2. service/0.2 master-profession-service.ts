import prisma from "../_db/prisma";
import masterProfessionSchema from "../1. validation/0.2 master-profession-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "../_lib/helpers/function";
import { MasterProfession } from "@prisma/client";

export const getListMasterProfessionService = async () => {
  const result = await prisma.masterProfession.findMany();
  const resultDto = result?.map((data:MasterProfession) => ({
    id: data?.id,
    name: data?.name,
  }));
  return result ? resultDto : [];
};

export const getMasterProfessionByIdService = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.findFirst({
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

export const createBulkMasterProfessionService = async (
  params: MasterProfession[]
) => {
  const listDataDto = params?.map((data) => ({
    name: data?.name,
  }));

  await Promise.all(
    listDataDto?.map(async (dataDto) => {
      await validationParse({
        schema: masterProfessionSchema(),
        data: dataDto,
      });
    })
  );

  const result = await prisma?.masterProfession.createMany({
    data: listDataDto,
  });
  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertMasterProfessionService = async (params: MasterProfession) => {
  const id = params?.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    name: params.name,
  });

  await validationParse({
    schema: masterProfessionSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma?.masterProfession.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id"],
        }),
      })
    : await prisma?.masterProfession.create({
        data: dataDto,
      });
  const resultDto = {
    id: result?.id,
    name: result?.name,
  };

  return result ? resultDto : null;
};

export const deleteMasterProfessionByIdService = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
