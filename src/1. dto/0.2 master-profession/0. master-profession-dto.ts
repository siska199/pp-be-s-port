import prisma from "@0 db/prisma";
import masterProfessionSchema from "@2. validation/0.2 master-profession/0. master-profession-schema";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterProfession } from "@prisma/client";

export const getListMasterProfessionDto = async () => {
  const result = await prisma.masterProfession.findMany();
  const listMasterProfessionDto = result;
  return result ? listMasterProfessionDto : [];
};

export const getMasterProfessionByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
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
        schema: masterProfessionSchema,
        data: dataDto,
      });
    })
  );

  const result = await prisma?.masterProfession.createMany({
    data: listDataDto,
  });

  return result ?? null;
};

export const upsertMasterProfessionDto = async (params: MasterProfession) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params.name,
  };
  const result = await prisma?.masterProfession.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });
  const masterProfessionDto = result;

  return result ? masterProfessionDto : null;
};

export const deleteMasterProfessionByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
