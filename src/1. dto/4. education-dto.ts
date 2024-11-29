import prisma from "@0 db/prisma";
import { Education } from "@prisma/client";
import { TQueryParamsPaginationList } from "@_lib/types/index";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
} from "@_lib/helpers/function";

type TParamsListEducationDto = TQueryParamsPaginationList<keyof Education> & {
  id_level?: string;
  id_user: string;
};

export const getListEducationDto = async (params: TParamsListEducationDto) => {
  const {
    current_page,
    total_items,
    sort_by = "created_at",
    sort_dir = "desc",
    search,
    id_level,
    id_user,
  } = params;

  const skip = current_page * total_items;
  const take = total_items;

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
      [sort_by]: sort_dir,
    },
    include: {
      school: true,
      level: true,
      major: true,
    },
  });

  const resultDto = result;

  return result ? resultDto : [];
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
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_user"],
    }),
  });
  const resultDto = result;
  return result ? resultDto : null;
};
