import prisma from "@db/prisma";
import { Skill } from "@prisma/client";

export const getListSkill = async () => await prisma.skill?.findMany();

export const getSkillById = async (idSkill: string) =>
  await prisma?.skill?.findUnique({
    where: { id: idSkill },
  });

export const insertSkill = async (payload: Skill) =>
  await prisma.skill.create({ data: payload });

export const insertBulkSkill = async (payload: Skill[]) =>
  await prisma.skill.createMany({ data: payload });

export const updateSkill = async (params: {
  payload: Partial<Skill>;
  idSkill: string;
}) => {
  const { payload, idSkill } = params;
  return await prisma.skill.update({ data: payload, where: { id: idSkill } });
};

export const deleteSkill = async (idSkill: string) =>
  await prisma.skill.delete({
    where: { id: idSkill },
  });
