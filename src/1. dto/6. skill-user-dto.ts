import prisma from "@0 db/prisma";
import skillUserSchema from "@2. validation/6. skill-user-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
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
    page_no,
    items_perpage,
    sort_by = "created_at",
    sort_dir = "desc",
    id_skills,
    year_of_experiance,
    level,
  } = params;
  const listIdSkill = id_skills?.split(",");

  const skip = items_perpage * page_no;
  const take = items_perpage;

  const result = await prisma?.skillUser?.findMany({
    skip,
    take,
    where: {
      id_user,
      AND: [
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
      [sort_by]: sort_dir,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertSkillUserDto = async (params: SkillUser) => {
  const id = params.id;
  const dataDto = {
    id_skill: params.id_skill,
    year_of_experiance: params.year_of_experiance,
    level: params.level,
    id_user: params.id_user,
  };

  await validationParse({
    schema: skillUserSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.skillUser?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_user"],
    }),
  });
  const resultDto = result;
  return result ? resultDto : null;
};
