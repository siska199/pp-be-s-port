import prisma from "@_db/prisma";
import experianceSchema from "@1. validation/5. experiance-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  convertToISOString,
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
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
    page_no,
    items_perpage,
    sort_by,
    sort_dir,
    keyword,
    start_at,
    end_at,
    id_user,
  } = params;

  const skip = (Number(page_no) - 1) * Number(items_perpage);
  const take = items_perpage;

  const result = await prisma.experiance?.findMany({
    ...(skip && { skip }),
    ...(take && { take }),
    where: {
      id_user,
      AND: [
        {
          OR: [
            {
              company: {
                name: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },
            },
            {
              profession: {
                name: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        {
          ...(start_at && {
            start_at: {
              ...(start_at && { gte: new Date(start_at) }),
              ...(end_at && { lte: end_at }),
            },
          }),
          ...(end_at && {
            end_at: {
              ...(start_at && { gte: new Date(start_at) }),
              ...(end_at && { lte: end_at }),
            },
          }),
        },
      ],
    },
    orderBy: {
      ...(sort_by && { [sort_by]: sort_dir }),
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
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

  const items = await Promise.all(
    result?.map(async (data) => {
      return {
        ...data,
        company_name: data?.company?.name,
        profession_name: data?.profession?.name,
      };
    })
  );

  const resultDto = {
    items,
    total_items: await prisma?.experiance.count({
      where: { id_user },
    }),
    current_page: page_no || 1,
  };

  return result ? resultDto : [];
};

export const upsertExperianceDto = async (params: Experiance) => {
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

export const createBulkExperianceDto = async (params: Experiance[]) => {
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

export const getExperianceByIdDto = async (param: string) => {
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

  const image_company = await getImageUrlFromClaudinary({
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

export const deleteExperianceByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.experiance?.delete({
    where: { id },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
