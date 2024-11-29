import prisma from "@0 db/prisma";
import experianceSchema from "@2. validation/5. experiance-schema";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
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
    current_page,
    total_items,
    sort_by = "created_at",
    sort_dir = "desc",
    search,
    start_at,
    end_at,
    id_user,
  } = params;

  const skip = current_page * total_items;
  const take = total_items;

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
      [sort_by]: sort_dir,
    },
  });

  const resultDto = result;

  return result ? resultDto : [];
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

  await validationParse({
    schema: experianceSchema(!id),
    data: dataDto,
  });

  const result = await prisma.experiance?.upsert({
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
