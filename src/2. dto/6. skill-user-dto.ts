import prisma from "@0 db/prisma";
import skillUserSchema from "@1. validation/6. skill-user-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { TQueryParamsPaginationList } from "@_lib/types";
import { Level, SkillUser } from "@prisma/client";

type TParamsListSkillUserDto = TQueryParamsPaginationList<keyof SkillUser> & {
  id_user: string;
  id_skills?: string;
  years_of_experiance?: number;
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
    years_of_experiance,
    level,
  } = params;
  const listIdSkill = id_skills?.split(",");

  const skip = Number(items_perpage) * (Number(page_no) - 1);
  const take = items_perpage;

  const result = await prisma?.skillUser?.findMany({
    ...(skip && { skip }),
    ...(take && { take }),
    where: {
      ...(id_user && { id_user }),
      AND: [
        {
          OR: listIdSkill?.map((id_skill) => ({
            skill: {
              id: id_skill,
            },
          })),
        },
        {
          ...(level && { level }),
        },
        {
          ...(years_of_experiance && { years_of_experiance }),
        },
      ],
    },
    orderBy: {
      ...(sort_by && { [sort_by]: sort_dir }),
    },
    include: {
      skill: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      project_tech_stacks: {
        select: {
          project: true,
        },
      },
    },
  });

  const resultDto = {
    items: result?.map((data) => {
      return {
        ...filterKeysObject({
          object: data,
          keys: ["created_at", "updated_at"],
        }),
        id_category: data?.skill?.category?.id,
        category_name: data?.skill?.category?.name,
        skill_name: data?.skill?.name,
      };
    }),
    total_items: await prisma?.skillUser?.count({
      where: { id_user },
    }),
    current_page: page_no ?? 1,
  };

  return result ? resultDto : null;
};

export const getSkillUserByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.skillUser?.findUnique({
    where: {
      id,
    },
    include: {
      skill: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const skill_image = await getImageUrlFromClaudinary({
    publicId: result?.skill?.image || "",
  });

  const resultDto = filterKeysObject({
    object: {
      ...result,
      image: skill_image,
      skill_name: result?.skill?.name,
    },
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const upsertSkillUserDto = async (params: SkillUser) => {
  const id = params.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    id_skill: params.id_skill,
    years_of_experiance: params.years_of_experiance,
    level: params.level,
    id_user: params.id_user,
  });

  await validationParse({
    schema: skillUserSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma?.skillUser?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_user"],
        }),
      })
    : await prisma?.skillUser?.create({
        data: dataDto,
      });
  const resultDto = result;
  return result ? resultDto : null;
};

export const createBulkSkillUserDto = async (params: SkillUser[]) => {
  const listData = params?.map((data) => {
    return {
      id_skill: data?.id_skill,
      years_of_experiance: data?.years_of_experiance,
      level: data?.level,
      id_user: data?.id_user,
    };
  });

  const result = await prisma?.skillUser?.createMany({
    data: listData,
  });
  const resultDto = result;
  return result ? resultDto : null;
};

export const deleteSkillUserByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.skillUser?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
