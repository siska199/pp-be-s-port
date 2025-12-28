import prisma from "../_db/prisma";
import masterCategorySocialLinkSchema from "../1. validation/0.3 master-category-social-link-schema";
import { getCloudinaryUrl } from "../_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "../_lib/helpers/function";
import { MasterCategorySocialLink } from "@prisma/client";

export const getListMasterCategorySocialLinkService = async () => {
  const result = await prisma.masterCategorySocialLink.findMany();
  const resultDto = await Promise.all(
    result?.map(async (data:MasterCategorySocialLink) => {
      const image = await getCloudinaryUrl({
        publicId: data.image,
      });
      return {
        id: data?.id,
        name: data?.name,
        placeholder: data?.placeholder,
        default_value: data?.default_value,
        image,
      };
    })
  );
  return result ? resultDto : [];
};

export const getMasterCategorySocialLinkByIdService = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCategorySocialLink?.findFirst({
    where: {
      id,
    },
  });
  const image_url = await getCloudinaryUrl({
    publicId: String(result?.image),
  });

  const resultDto = {
    id: result?.id,
    name: result?.name,
    image: image_url,
    placeholder: result?.placeholder,
    default_value: result?.default_value,
  };
  return result ? resultDto : null;
};

export const createBulkMasterCategorySocialLinkService = async (
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
        schema: masterCategorySocialLinkSchema(),
        data,
      });
    })
  );

  const result = await prisma?.masterCategorySocialLink.createMany({
    data: listDataDto,
  });

  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertMasterCategorySocialLinkService = async (
  params: MasterCategorySocialLink
) => {
  const id = params?.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    name: params?.name,
    image: params?.image,
    placeholder: params?.placeholder,
    default_value: params?.default_value,
  });

  await validationParse({
    schema: masterCategorySocialLinkSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma?.masterCategorySocialLink.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id"],
        }),
      })
    : await prisma?.masterCategorySocialLink.create({
        data: dataDto,
      });
  const resultDto = {
    id: result?.id,
    name: result?.name,
    image: result?.name,
    placeholder: result?.placeholder,
    default_value: result?.default_value,
  };
  return result ? resultDto : null;
};

export const deleteMasterCategorySocialLinkByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.masterCategorySocialLink?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
