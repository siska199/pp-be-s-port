import prisma from "../_db/prisma";
import projectMenuSchema from "../1. validation/7.2 project-menu-schema";
import {
  deleteFromCloudinary,
  getCloudinaryUrl,
} from "../_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "../_lib/helpers/function";
import { ProjectMenu, ProjectMenuRelatedImage } from "@prisma/client";

export const getListProjectMenuService = async (param: string) => {
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
    orderBy: {
      created_at: "desc"
    }
  });

  const resultDto = await Promise.all(
    result?.map(async (projectMenu) => {
      const main_image = await getCloudinaryUrl({
        publicId: projectMenu?.main_image || "",
      });
      const related_images = await Promise.all(
        projectMenu?.related_images?.map(async (related_image) => {
          const related_image_url = await getCloudinaryUrl({
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
        main_image 
      };
    })
  );

  return result ? resultDto : null;
};

export const upsertProjectMenuService = async (
  params: ProjectMenu & {
    related_images: string[];
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
    related_images: {
      create: params?.related_images?.map((relatedImage) => ({
        image: relatedImage,
      })),
    },
  });

  await validationParse({
    schema: projectMenuSchema(!id),
    data: filterKeysObject({
      object: { ...dataDto },
      keys: ["related_images"],
    }),
  });

  if (id && params?.related_images?.length > 0) {
    const prev_related_images = await prisma.projectMenuRelatedImage?.findMany({
      where: {
        id_project_menu: id,
      },
    });
    await Promise.all(
      prev_related_images?.map(async (rm:ProjectMenuRelatedImage) => {
        await deleteFromCloudinary({
          publicId : rm.image
        });
        await prisma?.projectMenuRelatedImage?.delete({
          where: {
            id: rm?.id,
          },
        });
      })
    );
  }

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
        },
      })
    : await prisma?.projectMenu?.create({
        data: {
          ...dataDto,
        },
      });

  const resultDto = result;

  return result ? resultDto : null;
};

export const deleteProjectMenuByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.projectMenu?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
