import prisma from "@_lib/db/prisma";
import { MasterProfession } from "@prisma/client";

export const getListProfessions = async () =>
  await prisma.masterProfession.findMany();

export const insertBulkProfession = async (professions: MasterProfession[]) =>
  await prisma.masterProfession.createMany({
    data: professions,
  });
