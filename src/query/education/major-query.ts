import prisma from "@db/prisma";
import { Major } from "@prisma/client";

export const getListMajor = async () => await prisma.major.findMany();

export const getMajorById = async (id: string) =>
  await prisma.major.findUnique({ where: { id } });

export const insertBulkMajor = async (payload: Major[]) =>
  await prisma?.major?.createMany({
    data: payload,
  });

export const insertMajor = async (payload: Major) =>
  await prisma?.major?.create({ data: payload });
