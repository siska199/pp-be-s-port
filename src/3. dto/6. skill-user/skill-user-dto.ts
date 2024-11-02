import prisma from "@_lib/db/prisma";
import { SkillUser } from "@prisma/client";

export interface TParamsGetListSkillUser {
  idUser: string;
  queryObject: {
    page_no: number;
    items_perpage: number;
  };
}

export const getListSkillUser = async (params: TParamsGetListSkillUser) => {
  const { queryObject, idUser } = params;
  const { page_no, items_perpage } = queryObject;

  return await prisma.skillUser.findMany({
    skip: page_no * items_perpage,
    take: items_perpage,
    where: {
      id_user: idUser,
    },
  });
};

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
