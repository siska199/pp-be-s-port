import prisma from "@0 db/prisma";
import masterSkillSchema from "@1. validation/0.8 master-skill-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { MasterSkill } from "@prisma/client";

export const getListMasterSkillDto = async (params: {
  id_category?: string;
}) => {
  const { id_category } = params;
  const result = await prisma?.masterSkill?.findMany({
    where: {
      ...(id_category && { id_category }),
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const resultDto = await Promise.all(
    result?.map(async (data) => {
      const image_url = await getImageUrlFromClaudinary({
        publicId: data?.image || "",
      });
      return filterKeysObject({
        object: {
          ...data,
          image: image_url,
        },
        keys: ["created_at", "updated_at"],
      });
    })
  );
  return result ? resultDto : [];
};

export const getMasterSkillByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const image_url = await getImageUrlFromClaudinary({
    publicId: result?.image || "",
  });
  const reusltDto = filterKeysObject({
    object: {
      ...result,
      image: image_url,
    },
    keys: ["created_at", "updated_at"],
  });
  return result ? reusltDto : null;
};

export const upsertMasterSkillDto = async (params: MasterSkill) => {
  const id = params?.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    name: params?.name?.trim(),
    image: params?.image,
    color: params?.color?.trim(),
    id_category: params?.id_category?.trim(),
  });

  await validationParse({
    schema: masterSkillSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.masterSkill?.upsert({
    where: { id },
    create: dataDto,
    update: removeKeyWithUndifienedValue(dataDto),
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const deleteMasterSkillByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterSkill?.delete({
    where: { id },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
