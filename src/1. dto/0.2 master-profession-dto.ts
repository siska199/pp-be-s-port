import prisma from "@0 db/prisma";
import masterProfessionSchema from "@2. validation/0.2 master-profession-schema";
import {
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { MasterProfession } from "@prisma/client";

export const getListMasterProfessionDto = async () => {
  const result = await prisma.masterProfession.findMany();
  const resultDto = result?.map((data) => ({
    id: data?.id,
    name: data?.name,
  }));
  return result ? resultDto : [];
};

export const getMasterProfessionByIdDto = async (param: string) => {
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

export const createBulkMasterProfessionDto = async (
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

export const upsertMasterProfessionDto = async (params: MasterProfession) => {
  const id = params?.id ?? "";
  const dataDto = {
    id,
    name: params.name,
  };

  await validationParse({
    schema: masterProfessionSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.masterProfession.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: removeKeyWithUndifienedValue(dataDto),
  });
  const resultDto = {
    id: result?.id,
    name: result?.name,
  };

  return result ? resultDto : null;
};

export const deleteMasterProfessionByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
