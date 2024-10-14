import prisma from "@db/prisma";
import { SkillUser } from "@prisma/client";

export const getListSkillUser = async (idUser: string) =>
  await prisma.skillUser.findMany({
    where: {
      id_user: idUser,
    },
  });

export const getSkillUserById = async (params: {
  id: string;
  idUser: string;
}) => {
  const { id, idUser } = params;
  return await prisma.skillUser.findUnique({
    where: {
      id,
      id_user: idUser,
    },
  });
};

export const insertSkillUser = async (payload: SkillUser) => {
  return await prisma.skillUser.create({
    data: payload,
  });
};

export const updateSkillUser = async (params: {
  id: string;
  payload: SkillUser;
}) => {
  const { id, payload } = params;
  return await prisma.skillUser.update({
    data: payload,
    where: {
      id: id,
    },
  });
};

export const deleteUserSkill = async (id: string) => {
  return await prisma.skillUser.delete({
    where: {
      id,
    },
  });
};
