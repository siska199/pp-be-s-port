import prisma from "@_lib/db/prisma";
import { MasterCategorySocialLink } from "@prisma/client";

export const createMasterCategorySocialLinkDto = async (
  params: MasterCategorySocialLink
) => {
  const result = await prisma?.masterCategorySocialLink.create({
    data: params,
  });

  return result ?? null;
};

export const createBulkMasterCategorySocialLinkDto = async (
  params: MasterCategorySocialLink[]
) => {
  const data = params;
  const result = await prisma?.masterCategorySocialLink.createMany({
    data,
  });

  return result ?? null;
};

export const getListMasterCategorySocialLinkDto = async () => {
  const result = await prisma.masterCategorySocialLink.findMany();
  return result ?? [];
};

export const getMasterCategorySocialLinkDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySocialLink?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterCategorySocialLinkDto = async (params: {
  id: string;
  data: MasterCategorySocialLink;
}) => {
  const { id, data } = params;
  const result = await prisma?.masterCategorySocialLink.update({
    where: {
      id,
    },
    data,
  });

  return result ?? null;
};

export const deleteMasterCategorySocialLinkDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterCategorySocialLink?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
