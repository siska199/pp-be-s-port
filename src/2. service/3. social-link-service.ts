import prisma from "../_db/prisma";
import { getCloudinaryUrl } from "../_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
} from "../_lib/helpers/function";
import { SocialLink } from "@prisma/client";

export const getListSocialLinkService = async (params: { id_user: string }) => {
  const { id_user } = params;
  const result = await prisma.socialLink.findMany({
    where: {
      id_user,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          default_value: true,
          placeholder: true,
          image: true,
        },
      },
    },
  });

  const resultDto = await Promise.all(
    result?.map(async (data) => {
      const image_url = await getCloudinaryUrl({
        publicId: data?.category?.image,
      });
      return {
        id: data?.id,
        url: data?.url,
        id_category: data?.id_category,
        id_user: data?.id_user,
        category: {
          ...data?.category,
          image: image_url,
        },
      };
    })
  );
  return result ? resultDto : null;
};

export const upsertSocialLinkService = async (params: SocialLink) => {
  const id = params.id ?? "";

  const dataDto = trimObject({
    url: params?.url,
    id_category: params?.id_category,
    id_user: params?.id_user,
  });

  const result = id
    ? await prisma?.socialLink?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_user"],
        }),
      })
    : await prisma?.socialLink?.create({
        data: dataDto,
      });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const upsertBulkSocialLinkService = async (
  params: (Omit<SocialLink, "created_at" | "updated_at" | "id"> & {
    id?: string;
  })[]
) => {
  const listData = params?.map((data) =>
    removeKeyWithUndifienedValue({
      url: data?.url,
      id_category: data?.id_category,
      id_user: data?.id_user,
      id: data?.id || undefined,
    })
  );

  const isUpdate = listData?.every((data) => data.id);

  const result = isUpdate
    ? await Promise.all(
        listData?.map(async (data) => {
          await prisma?.socialLink?.update({
            where: {
              id: data?.id,
            },
            data: data,
          });
        })
      )
    : await prisma?.socialLink?.createMany({
        data: listData as SocialLink[],
      });

  const resultDto = result;

  return resultDto;
};

export const deleteSocialLinkByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.socialLink?.delete({
    where: {
      id,
    },
  });

  return result;
};
