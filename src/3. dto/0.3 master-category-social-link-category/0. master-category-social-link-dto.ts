import prisma from "@0 db/prisma";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterCategorySocialLink } from "@prisma/client";
import categorySocialLinkSchema from "@4. validation/0.3 master-category-social-link/0. master-category-social-link-schema";
import masterCategorySocialLinkSchema from "@4. validation/0.3 master-category-social-link/0. master-category-social-link-schema";

export const createMasterCategorySocialLinkDto = async (
  params: MasterCategorySocialLink
) => {
  const dataDto = {
    name: params.name,
    image: params.image,
    placeholder: params.placeholder,
    default_value: params?.default_value,
  };

  await validationParse({
    schema: categorySocialLinkSchema,
    data: dataDto,
  });

  const result = await prisma?.masterCategorySocialLink.create({
    data: params,
  });

  return result ?? null;
};

export const createBulkMasterCategorySocialLinkDto = async (
  params: MasterCategorySocialLink[]
) => {
  const listDataDto = params?.map((data) => ({
    name: data.name,
    image: data.image,
    placeholder: data.placeholder,
    default_value: data?.default_value,
  }));

  await Promise.all(
    listDataDto?.map(async (data) => {
      await validationParse({
        schema: masterCategorySocialLinkSchema,
        data,
      });
    })
  );

  const result = await prisma?.masterCategorySocialLink.createMany({
    data: listDataDto,
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
