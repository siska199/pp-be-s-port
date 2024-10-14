import prisma from "@db/prisma";
import { PersonalInformation } from "@prisma/client";

export const getPersonalInfoByIdUser = async (id_user: string) =>
  await prisma.personalInformation.findFirst({
    where: {
      id_user,
    },
  });

export const createPersonalInfo = async (payload: PersonalInformation) => {
  return await prisma.personalInformation.create({
    data: {
      ...payload,
      
    },
  });
};

export const updatePersonalInfo = async (params: {
  id_user: string;
  id: string;
  payload: PersonalInformation;
}) => {
  const { id, id_user, payload } = params;
  return await prisma.personalInformation.update({
    where: {
      id_user,
      id,
    },
    data: {
      ...payload,
    },
  });
};
