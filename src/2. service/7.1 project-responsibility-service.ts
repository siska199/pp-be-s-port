import { ProjectResponsibility } from "@prisma/client";
import prisma from "../_db/prisma";

export const getListProjectResponsibilityService = async (param: string) => {
  const id_project = param;

  const result = await prisma?.projectResponsibility?.findMany({
    where: {
      id_project,
    },
    orderBy: {
      created_at: "desc"
    }
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
