import prisma from "@0 db/prisma";
import projectRelatedImageSchema from "@1. validation/7.2.1 project-related-image-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { ProjectMenuRelatedImage } from "@prisma/client";

export const getListProjectMenuRelatedImageDto = async (param: string) => {
  const id_project_menu = param;

  const result = await prisma?.projectMenuRelatedImage.findMany({
    where: {
      id_project_menu,
    },
  });

  const resultDto = result;

  return result ? resultDto : null;
};

export const upsertProjectMenuRelatedImageDto = async (
  params: ProjectMenuRelatedImage
) => {
  const id = params?.id;
  const dataDto = {
    image: params?.image,
    id_project_menu: params?.id_project_menu,
  };

  await validationParse({
    schema: projectRelatedImageSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma?.projectMenuRelatedImage?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_project_menu"],
        }),
      })
    : await prisma?.projectMenuRelatedImage?.create({
        data: dataDto,
      });

  const resultDto = result;

  return result ? resultDto : null;
};
