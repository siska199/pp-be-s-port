import prisma from "@0 db/prisma";
import filterKeysObject from "@_lib/helpers/filter-keys-object";
import { TQueryParamsPaginationList } from "@_lib/types";
import { Level, SkillUser } from "@prisma/client";

type TParamsListSkillUserDto = TQueryParamsPaginationList<keyof SkillUser> & {
  id_user: string;
  id_skills?: string;
  year_of_experiance?: number;
  level?: Level;
};

export const getListSkillUserDto = async (params: TParamsListSkillUserDto) => {
  const {
    id_user,
    currentPage,
    totalItems,
    sortBy = "created_at",
    sortDir = "desc",
    id_skills,
    year_of_experiance,
    level,
  } = params;
  const listIdSkill = id_skills?.split(",");

  const skip = totalItems * currentPage;
  const take = totalItems;

  const result = await prisma?.skillUser?.findMany({
    skip,
    take,
    where: {
      id_user,
      AND: [
        {
          OR : [
            {
              
            }
          ]
        },
        {
          OR: listIdSkill?.map((id_skill) => ({
            skill: {
              id: id_skill,
            },
          })),
        },
        {
          level: level,
        },
        {
          year_of_experiance: year_of_experiance,
        },
      ],
    },
    orderBy: {
      [sortBy]: sortDir,
    },
  });

  return result ?? null;
};

export const upsertSkillUserDto = async (params: SkillUser) => {
  const id = params.id;
  const dataDto = {
    id_skill: params.id_skill,
    year_of_experiance: params.year_of_experiance,
    level: params.level,
    id_user: params.id_user,
  };

  const result = await prisma?.skillUser?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({ object: dataDto, keys: ["id_user"] }),
  });

  return result ?? null;
};
