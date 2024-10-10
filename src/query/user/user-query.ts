import prisma from "@db/prisma";

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
