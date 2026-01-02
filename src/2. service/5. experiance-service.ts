import { Experiance, Prisma } from "@prisma/client";
import experianceSchema from "../1. validation/5. experiance-schema";
import prisma from "../_db/prisma";
import { getCloudinaryUrl } from "../_lib/helpers/claudinary";
import {
  convertToISOString,
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "../_lib/helpers/function";
import { TQueryParamsPaginationList } from "../_lib/types/index";
import { uniqueByKey } from '../_lib/helpers/function';

type TParamsListExperianceDto = TQueryParamsPaginationList<keyof Experiance> & {
  start_at?: string;
  end_at?: string;
  id_user?: string;
  username?: string;
};

export const getListExperianceService = async (
  params: TParamsListExperianceDto
) => {
  const {
    page_no = 1,
    items_perpage = 10,
    sort_by,
    sort_dir = "desc",
    keyword,
    start_at,
    end_at,
    id_user,
    username
  } = params;

  const skip = (Number(page_no) - 1) * Number(items_perpage);
  const take = items_perpage;

  const whereFilter: Prisma.ExperianceWhereInput = {
    AND: [
      ...(id_user ? [{ id_user }] : []),
      ...(username
          ? [
              {
                user: {
                  username,
                },
              },
            ]
          : []),
      {
        OR: [
          {
            company: {
              is: {
                name: { contains: keyword || "", mode: "insensitive" },
              },
            },
          },
          {
            profession: {
              is: {
                name: { contains: keyword || "", mode: "insensitive" },
              },
            },
          },
        ],
      },
      ...(start_at || end_at
        ? [
            {
              ...(start_at && {
                start_at: {
                  gte: new Date(start_at),
                  ...(end_at && { lte: new Date(end_at) }),
                },
              }),
              ...(end_at && {
                end_at: {
                  lte: new Date(end_at),
                  ...(start_at && { gte: new Date(start_at) }),
                },
              }),
            },
          ]
        : []),
    ],
  };

  const relationOrderMap: Record<string, any> = {
    company_name: { company: { name: sort_dir } },
    profession_name: { profession: { name: sort_dir } },
  };

  const orderBy = sort_by
    ? relationOrderMap[sort_by as string] || { [sort_by]: sort_dir }
    : undefined;
  const result = await prisma.experiance.findMany({
    ...(page_no && items_perpage
        ? { skip, take }
        : {}),
    where: whereFilter,
    orderBy,
    include: {
      company: { select: { id: true, name: true } },
      profession: { select: { id: true, name: true } },
      projects: {
        select: {
          id: true, name: true, tech_stacks: {
            select: {
              id: true,
              skill_user: {
                include: {
                  skill: { select: { id: true, name: true, color: true } },
                },
              },
            },
          }
        }
      }
    },
  });

  const items = result.map((data) => {
    const techStacks = [
    ...new Set(
      data?.projects?.flatMap((project ) => project.tech_stacks) ?? [],
    )
    ]?.map((data) => ({
      ...data,
      name: data?.skill_user.skill.name,
      color : data?.skill_user?.skill?.color
    }))
    return ({
      ...data,
      company_name: data.company?.name,
      profession_name: data.profession?.name,
      tech_stacks :  uniqueByKey(techStacks, 'name')
    })
  });

  const totalItems = await prisma.experiance.count({ where: whereFilter });

  const totalPages = Math.ceil(totalItems / (items_perpage || 1));

  return {
    items,
    total_items: totalItems,
    total_pages: totalPages,
    current_page: page_no,
  };
};

export const upsertExperianceService = async (params: Experiance) => {
  const id = params.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    id_company: params.id_company,
    id_profession: params.id_profession,
    id_user: params.id_user,
    description: params.description,
    start_at: convertToISOString(params.start_at),
    end_at: params.end_at ? convertToISOString(params.end_at) : undefined,
    is_currently_work_here: params.is_currently_work_here ?? false,
  });

  await validationParse({
    schema: experianceSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma.experiance?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_user"],
        }),
      })
    : await prisma.experiance?.create({
        data: dataDto,
      });
  const resultDto = result;
  return result ? resultDto : null;
};

export const createBulkExperianceService = async (params: Experiance[]) => {
  const dataDto = params?.map((data) => ({
    id_company: data.id_company,
    id_profession: data.id_profession,
    id_user: data.id_user,
    description: data.description,
    start_at: convertToISOString(data.start_at),
    end_at: data.end_at ? convertToISOString(data.end_at) : undefined,
    is_currently_work_here: data.is_currently_work_here ?? false,
  }));

  const result = await prisma?.experiance?.createMany({
    data: dataDto,
  });

  const resultDto = result;

  return resultDto;
};

export const getExperianceByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.experiance?.findUnique({
    where: {
      id,
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      profession: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const image_company = await getCloudinaryUrl({
    publicId: result?.company?.image || "",
  });

  const resultDto = filterKeysObject({
    object: {
      ...result,
      company_name: result?.company?.name,
      profession_name: result?.profession?.name,
      company: {
        ...result?.company,
        iamge: image_company,
      },
    },
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const deleteExperianceByIdService = async (param: string) => {
  const id = param;
  const result = await prisma?.experiance?.delete({
    where: { id },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
