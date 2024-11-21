import prisma from "@0 db/prisma";
import { ProjectTechStack } from "@prisma/client";

export const getListProjectTechStackDto = async (param: string) => {
  const id_project = param;
  const result = await prisma?.projectTechStack?.findMany({
    where: {
      id_project,
    },
  });
  const listProjectTexhStackDto = result;
  return result ? listProjectTexhStackDto : [];
};

export const upsertProjectTechStackDto = async (params: ProjectTechStack) => {
  const id = String(params?.id);
  const dataDto = {
    id_skill_user: params?.id_skill_user,
    id_project: params?.id_project,
  };

  const result = await prisma?.projectTechStack?.upsert({
    where: {
      id,
    },
    update: dataDto,
    create: dataDto,
  });

  const projectTechStackDto = result;

  return result ? projectTechStackDto : null;
};
