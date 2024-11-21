import prisma from "@0 db/prisma";
import { ProjectResponsibility } from "@prisma/client";

export const getListProjectResponsibilityDto = async (param: string) => {
  const id_project = param;

  const result = await prisma?.projectResponsibility?.findMany({
    where: {
      id_project,
    },
  });

  const listDataDto = result;

  return result ? listDataDto : [];
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
    update: dataDto,
  });

  const projectResponsibilityDto = result;
  return result ? projectResponsibilityDto : null;
};
