import prisma from "@0 db/prisma";
import { ProjectMenu } from "@prisma/client";

export const getListProjectMenuDto = async (param: string) => {
  const id_project = param;
  const result = await prisma?.projectMenu?.findMany({
    where: {
      id_project,
    },
  });

  const listProjectDto = result;

  return result ? listProjectDto : null;
};

export const upsertProjectMenuDto = async (params: ProjectMenu) => {
  const id = params?.id;
  const dataDto = {
    name: params?.name,
    description: params?.description,
    main_image: params?.main_image,
    features: params?.features,
    id_project: params?.id_project,
  };

  const result = await prisma?.projectMenu?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });

  const projectMenuDto = result;

  return result ? projectMenuDto : null;
};
