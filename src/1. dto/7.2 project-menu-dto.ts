import prisma from "@0 db/prisma";
import projectMenuSchema from "@2. validation/7.2 project-menu-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { ProjectMenu } from "@prisma/client";

export const getListProjectMenuDto = async (param: string) => {
  const id_project = param;
  const result = await prisma?.projectMenu?.findMany({
    where: {
      id_project,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertProjectMenuDto = async (params: ProjectMenu) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
    description: params?.description,
    main_image: params?.main_image,
    features: params?.features,
    id_project: params?.id_project,
  };
  await validationParse({
    schema: projectMenuSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.projectMenu?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_project"],
    }),
  });

  const resultDto = result;

  return result ? resultDto : null;
};
