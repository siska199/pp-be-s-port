import prisma from "@0 db/prisma";
import masterProfessionSchema from "@2. validation/0.2 master-profession/0. master-profession-schema";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterProfession } from "@prisma/client";

export const createMasterProfessionDto = async (params: MasterProfession) => {
  const dataDto = {
    name: params?.name,
  };

  await validationParse({
    schema: masterProfessionSchema,
    data: dataDto,
  });

  const result = await prisma?.masterProfession.create({
    data: params,
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

export const getListMasterProfessionDto = async () => {
  const result = await prisma.masterProfession.findMany();
  return result ?? [];
};

export const getMasterProfessionDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterProfession?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterProfessionDto = async (params: {
  id: string;
  data: MasterProfession;
}) => {
  const { id, data } = params;

  const dataDto = {
    name: data.name,
  };
  const result = await prisma?.masterProfession.update({
    where: {
      id,
    },
    data: dataDto.name,
  });

  return result ?? null;
};

export const deleteMasterProfessionDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterProfession?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
