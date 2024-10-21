import prisma from "@db/prisma";
import { University } from "@prisma/client";

export const getUniversities = async () => await prisma?.university?.findMany();

export const getUniversityById = async (id: string) =>
  await prisma?.university?.findUnique({
    where: { id },
  });

export const insertUniversity = async (payload: University) =>
  await prisma?.university?.create({
    data: payload,
  });

export const insertBulkUniversity = async (payload: University[]) =>
  await prisma?.university?.createMany({
    data: payload,
  });
