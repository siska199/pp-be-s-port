import prisma from "@0 db/prisma";
import filterKeysObject from "@_lib/helpers/filter-keys-object";
import { Education } from "@prisma/client";

interface TParamsListEducationDto {
  currentPage: number;
  totalItems: number;
  sortBy: keyof Education;
  sortDir: "desc" | "asc";
  search?: string;
  id_level?: string;
  id_user: string;
}

export const getListEducationDto = async (params: TParamsListEducationDto) => {
  const {
    currentPage,
    totalItems,
    sortBy = "created_at",
    sortDir = "desc",
    search,
    id_level,
    id_user,
  } = params;

  const skip = currentPage * totalItems;
  const take = totalItems;

  const result = await prisma?.education?.findMany({
    skip,
    take,
    where: {
      id_user,
      OR: [
        {
          school: {
            name: {
              contains: search,
            },
          },
          major: {
            name: {
              contains: search,
            },
          },
        },
        {
          level: {
            id: id_level,
          },
        },
      ],
    },
    orderBy: {
      [sortBy]: sortDir,
    },
    include: {
      school: true,
      level: true,
      major: true,
    },
  });

  const listEducationDto = result;

  return result ? listEducationDto : [];
};

export const upsertEducationDto = async (params: Education) => {
  const id = params.id;
  const dataDto = {
    gpa: params.gpa,
    description: params.description,
    id_user: params.id_user,
    id_level: params.id_level,
    id_major: params.id_major,
    id_school: params.id_school,
    start_at: params.start_at,
    end_at: params.end_at,
  };

  const result = await prisma.education.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({ object: dataDto, keys: ["id_user"] }),
  });

  return result ?? null;
};
