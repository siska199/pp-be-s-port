import prisma from "@db/prisma";

export const getPersonalInfoByIdUser = async (id_user: string) =>
  await prisma.personalInformation.findFirst({
    where: {
      id_user,
    },
  });
