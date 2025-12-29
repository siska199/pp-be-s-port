import { ProjectLink } from "@prisma/client";
import prisma from "../_db/prisma";


export const getListProjectLinkService = async (param: string) => {
  const id_project = param;

  const result = await prisma.projectLink.findMany({
    where: {
      id_project,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return result ?? [];
};


export const upsertProjectLinkService = async (
  params: ProjectLink
) => {
  const id = params?.id;

  const dataDto = {
    id_project: params.id_project,
    url: params.url,
    label: params.label,
  };

  const result = id
    ? await prisma.projectLink.update({
        where: { id },
        data: {
          url: dataDto.url,
          label: dataDto.label,
        },
      })
    : await prisma.projectLink.create({
        data: dataDto,
      });

  return result ?? null;
};


export const deleteProjectLinkByIdService = async (param: string) => {
  const id = param;

  const result = await prisma.projectLink.delete({
    where: { id },
  });

  return result ?? null;
};
