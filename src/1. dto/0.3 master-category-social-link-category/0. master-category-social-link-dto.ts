import prisma from "@0 db/prisma";
import masterCategorySocialLinkSchema from "@2. validation/0.3 master-category-social-link/0. master-category-social-link-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterCategorySocialLink } from "@prisma/client";

export const getListMasterCategorySocialLinkDto = async () => {
  const result = await prisma.masterCategorySocialLink.findMany();
  const listMasterCategorySocialLinkDto = await Promise.all(
    result?.map(async (data) => {
      const image = await getImageUrlFromClaudinary({
        publicId: data.image,
      });
      return {
        ...data,
        image,
      };
    })
  );
  return result ? listMasterCategorySocialLinkDto : [];
};

export const getMasterCategorySocialLinkByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySocialLink?.findFirst({
    where: {
      id,
    },
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

export const upsertMasterCategorySocialLinkDto = async (
  params: MasterCategorySocialLink
) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
    image: params?.image,
    placeholder: params?.placeholder,
    default_value: params?.default_value,
  };

  const result = await prisma?.masterCategorySocialLink.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });
  const masterCategorySocialLinkDto = result;
  return result ? masterCategorySocialLinkDto : null;
};

export const deleteMasterCategorySocialLinkByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterCategorySocialLink?.delete({
    where: {
      id,
    },
  });

  return result ?? null;
};
