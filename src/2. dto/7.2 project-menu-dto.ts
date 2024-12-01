import prisma from "@0 db/prisma";
import projectMenuSchema from "@1. validation/7.2 project-menu-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { ProjectMenu } from "@prisma/client";

export const getListProjectMenuDto = async (param: string) => {
  const id_project = param;
  const result = await prisma?.projectMenu?.findMany({
    where: {
      id_project,
    },
    include: {
      related_images: {
        select: {
          id: true,
          image: true,
        },
      },
    },
  });

  const resultDto = await Promise.all(
    result?.map(async (projectMenu) => {
      const related_images = await Promise.all(
        projectMenu?.related_images?.map(async (related_image) => {
          const related_image_url = await getImageUrlFromClaudinary({
            publicId: related_image?.image,
          });
          return {
            id: related_image?.id,
            image: related_image_url,
          };
        })
      );

      return {
        ...projectMenu,
        related_images,
      };
    })
  );

  return result ? resultDto : null;
};

export const upsertProjectMenuDto = async (
  params: ProjectMenu & {
    related_images: string[];
    id_related_images?: string[];
  }
) => {
  const id = params?.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    name: params?.name,
    description: params?.description,
    main_image: params?.main_image,
    features: params?.features,
    id_project: params?.id_project,
  });

  const updated_related_images = params?.related_images;
  const id_updated_related_images = params?.id_related_images;

  await validationParse({
    schema: projectMenuSchema(!id),
    data: filterKeysObject({
      object: { ...dataDto },
      keys: [],
    }),
  });

  const result = id
    ? await prisma?.projectMenu?.update({
        where: {
          id,
        },
        data: {
          ...filterKeysObject({
            object: removeKeyWithUndifienedValue(dataDto),
            keys: ["id_project"],
          }),
          related_images: {
            update: id_updated_related_images?.map((id_urmi, i) => ({
              where: {
                id: id_urmi,
              },
              data: {
                image: updated_related_images[i],
              },
            })),
          },
        },
      })
    : await prisma?.projectMenu?.create({
        data: {
          ...dataDto,
          related_images: {
            create: params?.related_images?.map((relatedImage) => ({
              image: relatedImage,
            })),
          },
        },
      });

  const resultDto = result;

  return result ? resultDto : null;
};

export const deleteProjectMenuByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.projectMenu?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
