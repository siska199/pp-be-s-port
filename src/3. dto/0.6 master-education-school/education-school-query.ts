import prisma from "@db/prisma";
import { EducationSchool } from "@prisma/client";

export const getUniversities = async () =>
  await prisma?.educationLevel?.findMany();

export const getUniversityById = async (id: string) =>
  await prisma?.educationSchool?.findUnique({
    where: { id },
  });

export const insertUniversity = async (payload: EducationSchool) =>
  await prisma?.educationSchool?.create({
    data: payload,
  });

export const insertBulkUniversity = async (payload: EducationSchool[]) =>
  await prisma?.educationSchool?.createMany({
    data: payload,
  });
