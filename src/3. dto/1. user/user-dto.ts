import prisma from "@_lib/db/prisma";
import { User } from "@prisma/client";

export const getUserBy_Dto = async (params: Partial<User>) => {
  const result = await prisma.user.findFirst({
    where: {
      ...(params?.id && { id: params?.id }),
      ...(params?.email && { email: params?.email }),
    },
  });

  return result ?? null;
};

export const createUserDto = async (payload: User) => {
  const result = await prisma.user.create({
    data: {
      ...payload,
    },
  });

  return result ?? null;
};
