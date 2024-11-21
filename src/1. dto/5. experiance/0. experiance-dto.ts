import prisma from "@0 db/prisma";
import filterKeysObject from "@_lib/helpers/filter-keys-object";
import { TQueryParamsPaginationList } from "@_lib/types/index";
import { Experiance } from "@prisma/client";

type TParamsListExperianceDto = TQueryParamsPaginationList<keyof Experiance> & {
  start_at?: string;
  end_at?: string;
  id_user: string;
};

export const getListExperianceDto = async (
  params: TParamsListExperianceDto
) => {
  const {
    currentPage,
    totalItems,
    sortBy = "created_at",
    sortDir = "desc",
    search,
    start_at,
    end_at,
    id_user,
  } = params;

  const skip = currentPage * totalItems;
  const take = totalItems;

  const result = await prisma.experiance?.findMany({
    skip,
    take,
    where: {
      id_user,
      OR: [
        {
          company: {
            name: {
              contains: search,
            },
          },
          profession: {
            name: {
              contains: search,
            },
          },
        },
        {
          start_at: {
            gte: start_at,
            lte: end_at,
          },
          end_at: {
            gte: start_at,
            lte: end_at,
          },
        },
      ],
    },
    orderBy: {
      [sortBy]: sortDir,
    },
  });

  const listexperianceDto = result;

  return result ? listexperianceDto : [];
};

export const upsertExperianceDto = async (params: Experiance) => {
  const id = params.id;
  const dataDto = {
    id_company: params.id_company,
    id_profession: params.id_profession,
    id_user: params.id_user,
    description: params.description,
    start_at: params.start_at,
    end_at: params.end_at,
    is_currently_work_here: params.is_currently_work_here,
  };

  const result = await prisma.experiance?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({ object: dataDto, keys: ["id_user"] }),
  });

  return result ?? null;
};
