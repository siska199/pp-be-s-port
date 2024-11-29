import prisma from "@0 db/prisma";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
} from "@_lib/helpers/function";
import { SocialLink } from "@prisma/client";

export const getListSocialLinkDto = async (params: { id_user: string }) => {
  const { id_user } = params;
  const result = await prisma.socialLink.findMany({
    where: {
      id_user,
    },
  });
  const resultDto = result?.map((data) => ({
    id: data?.id,
    url: data?.url,
    id_category: data?.id_category,
    id_user: data?.id_user,
  }));
  return result ? resultDto : null;
};

export const upsertSocialLinkDto = async (params: SocialLink) => {
  const id = params.id;
  const dataDto = {
    url: params?.url,
    id_category: params?.url,
    id_user: params?.id_user,
  };

  const result = await prisma?.socialLink?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_user"],
    }),
  });

  const resultDto = result;

  return result ? resultDto : null;
};
