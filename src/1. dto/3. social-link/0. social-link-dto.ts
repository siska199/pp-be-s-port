import prisma from "@0 db/prisma";
import filterKeysObject from "@_lib/helpers/filter-keys-object";
import { SocialLink } from "@prisma/client";

export const getListSocialLinkDto = async () => {
  const result = await prisma.socialLink.findMany();
  return result;
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
    update: filterKeysObject({ object: dataDto, keys: ["id_user"] }),
  });

  return result ?? {};
};
