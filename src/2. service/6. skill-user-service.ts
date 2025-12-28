import prisma from "../_db/prisma";
import skillUserSchema from "../1. validation/6. skill-user-schema";
import { getCloudinaryUrl } from "../_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "../_lib/helpers/function";
import { TQueryParamsPaginationList } from "../_lib/types";
import { Level, Prisma, SkillUser } from "@prisma/client";

type TParamsListSkillUserDto = TQueryParamsPaginationList<keyof SkillUser> & {
  id_user: string;
  id_skills?: string;
  years_of_experiance?: number;
  level?: Level;
};

export const getListSkillUserService = async (params: TParamsListSkillUserDto) => {
  const {
    id_user,
    page_no = 1,
    items_perpage = 10,
    sort_by = "created_at",
    sort_dir = "desc",
    id_skills,
    years_of_experiance,
    level,
  } = params;

  const listIdSkill = id_skills?.split(",") || [];
  const skip = Number(items_perpage) * (Number(page_no) - 1);
  const take = items_perpage;

  const whereFilter: Prisma.SkillUserWhereInput = {
    ...(id_user && { id_user }),
    AND: [
      ...(listIdSkill.length
        ? [
            {
              OR: listIdSkill.map((id_skill) => ({
                skill: { is: { id: id_skill } },
              })),
            },
          ]
        : []),
      ...(level ? [{ level }] : []),
      ...(years_of_experiance ? [{ years_of_experiance }] : []),
    ],
  };

  const relationOrderMap: Record<string, Prisma.SkillUserOrderByWithRelationInput> = {
    skill_name: { skill: { name: sort_dir } },
    category_name: { skill: { category: { name: sort_dir } } },
  };

  const orderBy: Prisma.SkillUserOrderByWithRelationInput | undefined =
    sort_by ? relationOrderMap[sort_by as string] || { [sort_by as keyof Prisma.SkillUserOrderByWithRelationInput]: sort_dir } : undefined;

  const result = await prisma.skillUser.findMany({
    ...(page_no && items_perpage
        ? { skip, take }
        : {}),
    where: whereFilter,
    orderBy,
    include: {
      skill: {
        select: {
          id: true,
          name: true,
          category: { select: { id: true, name: true } },
        },
      },
      project_tech_stacks: { select: { project: true } },
    },
  });

  const totalItems = await prisma.skillUser.count({ where: whereFilter });
  const totalPages = Math.ceil(totalItems / (items_perpage || 1));

  const items = result.map((data) => ({
    ...filterKeysObject({
      object: data,
      keys: ["created_at", "updated_at",],
    }),
    id_category: data.skill?.category?.id,
    category_name: data.skill?.category?.name,
    skill_name: data.skill?.name,
    project_tech_stacks: data?.project_tech_stacks?.map((data) => ({
       ...data?.project
     }))
  }));

  return {
    items,
    total_items: totalItems,
    total_pages: totalPages,
    current_page: page_no,
  };
};


export const getSkillUserByIdService = async (param: string) => {
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

  const skill_image = await getCloudinaryUrl({
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

export const upsertSkillUserService = async (params: SkillUser) => {
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

export const createBulkSkillUserService = async (params: SkillUser[]) => {
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

export const deleteSkillUserByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.skillUser?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
