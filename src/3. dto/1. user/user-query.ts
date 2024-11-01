import prisma from "@db/prisma";
import { User } from "@prisma/client";

export const getUserById = async (id: string) =>
  await prisma.user.findFirst({
    where: {
      id,
    },
  });

export const getUserByEMail = async (email: string) =>
  await prisma.user.findUnique({
    where: {
      email,
    },
  });

export const insertUser = (payload: User) =>
  prisma.user.create({
    data: {
      ...payload,
    },
  });
