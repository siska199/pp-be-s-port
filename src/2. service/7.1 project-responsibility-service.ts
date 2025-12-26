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

export const upsertProjectResponsiblityService = async (
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
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_project"],
        }),
      })
    : await prisma?.projectResponsibility?.create({
        data: dataDto,
      });

  const projectResponsibilityDto = result;
  return result ? projectResponsibilityDto : null;
};
