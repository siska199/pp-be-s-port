import prisma from "@0 db/prisma";
import projectTechStackSchema from "@2. validation/7.4 project-tech-stack-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { ProjectTechStack } from "@prisma/client";

export const getListProjectTechStackDto = async (param: string) => {
  const id_project = param;
  const result = await prisma?.projectTechStack?.findMany({
    where: {
      id_project,
    },
  });
  const resultDto = result;
  return result ? resultDto : [];
};

export const upsertProjectTechStackDto = async (params: ProjectTechStack) => {
  const id = String(params?.id);
  const dataDto = {
    id_skill_user: params?.id_skill_user,
    id_project: params?.id_project,
  };

  await validationParse({
    schema: projectTechStackSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.projectTechStack?.upsert({
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
