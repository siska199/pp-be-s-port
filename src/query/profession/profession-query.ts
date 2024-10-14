import prisma from "@db/prisma";
import { Profession } from "@prisma/client";

export const getListProfessions = async () =>
  await prisma.profession.findMany();

export const insertBulkProfession = async (professions: Profession[]) =>
  await prisma.profession.createMany({
    data: professions,
  });
