import prisma from "@db/prisma";
import { EducationMajor } from "@prisma/client";

export const getListMajor = async () => await prisma.educationMajor.findMany();

export const getMajorById = async (id: string) =>
  await prisma.educationMajor.findUnique({ where: { id } });

export const insertBulkMajor = async (payload: EducationMajor[]) =>
  await prisma?.educationMajor?.createMany({
    data: payload,
  });

export const insertMajor = async (payload: EducationMajor) =>
  await prisma?.educationMajor?.create({ data: payload });
