import prisma from "@0 db/prisma";
import { ProjectRelatedImageMenu } from "@prisma/client";

export const getListProjectMenuRelatedImageDto = async (param: string) => {
  const id_project_menu = param;

  const result = await prisma?.projectRelatedImageMenu.findMany({
    where: {
      id_project_menu,
    },
  });

  const listProjectRealtedImageDto = result;

  return result ? listProjectRealtedImageDto : null;
};

export const upsertProjectMenuRelatedImageDto = async (
  params: ProjectRelatedImageMenu
) => {
  const id = params?.id;
  const dataDto = {
    image: params?.image,
    id_project_menu: params?.id_project_menu,
  };

  const result = await prisma?.projectRelatedImageMenu?.upsert({
    where: {
      id,
    },
    update: dataDto,
    create: dataDto,
  });

  const projectRelatedImageDto = result;

  return result ? projectRelatedImageDto : null;
};
