import prisma from "@_db/prisma";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
} from "@_lib/helpers/function";
import { ProjectResponsibility } from "@prisma/client";

export const getListProjectResponsibilityService = async (param: string) => {
  const id_project = param;

  const result = await prisma?.projectResponsibility?.findMany({
    where: {
      id_project,
    },
  });

  const resultDto = result;

  return result ? resultDto : [];
};

export const upsertProjectResponsibilityService = async (
  params: ProjectResponsibility
) => {
  const id = params?.id;
  const dataDto = {
    description: params?.description,
    id_project: params?.id_project,
  };

  const result = id
    ? await prisma?.projectResponsibility?.update({
        where: {
          id,
        },
      data: {
          description: dataDto?.description
        },
      })
    : await prisma?.projectResponsibility?.create({
        data: dataDto,
      });

  const projectResponsibilityDto = result;
  return result ? projectResponsibilityDto : null;
};

export const deleteProjectResponsibilityByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.projectResponsibility?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
