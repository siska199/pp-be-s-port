import prisma from "@db/prisma";
import { SkillProject } from "@prisma/client";

export const getListSkillProject = async (id_project: string) =>
  await prisma.skillProject?.findMany({
    where: {
      id_project,
    },
  });

export const getSkillProjectById = async (id: string) =>
  await prisma?.skillProject?.findUnique({
    where: {
      id,
    },
  });

export const insertSkillProject = async (payload: SkillProject) =>
  await prisma?.skillProject?.create({
    data: payload,
  });

export const updateSkillProject = async (params: {
  payload: Partial<SkillProject>;
  id: string;
}) => {
  const { payload, id } = params;
  return await prisma?.skillProject?.update({
    data: payload,
    where: {
      id,
    },
  });
};

export const deleteSkillProject = async (id: string) =>
  await prisma?.skillProject?.delete({
    where: {
      id,
    },
  });
