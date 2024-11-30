import prisma from "@0 db/prisma";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
} from "@_lib/helpers/function";
import { ProjectResponsibility } from "@prisma/client";

export const getListProjectResponsibilityDto = async (param: string) => {
  const id_project = param;

  const result = await prisma?.projectResponsibility?.findMany({
    where: {
      id_project,
    },
  });

  const resultDto = result;

  return result ? resultDto : [];
};

export const upsertProjectResponsiblityDto = async (
  params: ProjectResponsibility
) => {
  const id = params?.id;
  const dataDto = {
    description: params?.description,
    id_project: params?.id_project,
  };

  const result = await prisma?.projectResponsibility?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_project"],
    }),
  });

  const projectResponsibilityDto = result;
  return result ? projectResponsibilityDto : null;
};
