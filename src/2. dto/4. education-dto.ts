import prisma from "@0 db/prisma";
import { Education } from "@prisma/client";
import { TQueryParamsPaginationList } from "@_lib/types/index";
import {
  convertToISOString,
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import educationSchema from "@1. validation/4. education-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";

export type TParamsListEducationDto = TQueryParamsPaginationList<
  keyof Education
> & {
  id_level?: string;
  id_user: string;
  start_at?: string;
  end_at?: string;
};

export const getListEducationDto = async (params: TParamsListEducationDto) => {
  const {
    page_no,
    items_perpage,
    sort_by = "start_at",
    sort_dir = "desc",
    search,
    id_level,
    id_user,
    start_at,
    end_at,
  } = params;

  const skip = (Number(page_no) - 1) * Number(items_perpage);
  const take = items_perpage;

  const result = await prisma?.education?.findMany({
    ...(take && { take }),
    ...(skip && { skip }),
    where: {
      ...(id_user && { id_user }),
      AND: [
        {
          OR: [
            {
              school: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              major: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        {
          level: {
            ...(id_level && { id: id_level }),
          },
        },
        {
          ...(start_at && {
            start_at: {
              gte: new Date(start_at),
              ...(end_at && { lte: new Date(end_at) }),
            },
          }),
          ...(end_at && {
            end_at: {
              ...(start_at && { gte: new Date(start_at) }),
              lte: new Date(end_at),
            },
          }),
        },
      ],
    },
    orderBy: {
      [sort_by]: sort_dir,
    },
    include: {
      school: {
        select: {
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          id: true,
          name: true,
        },
      },
      major: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const resultDto = {
    items: result?.map((data) => {
      return filterKeysObject({
        object: {
          ...data,
          school_name: data?.school?.name,
          major_name: data?.major?.name,
          level_name: data?.level?.name,
        },
        keys: ["created_at", "updated_at"],
      });
    }),
    total_items: await prisma?.education?.count({
      where: { id_user },
    }),
    current_page: page_no,
  };

  return result ? resultDto : [];
};

export const getEducationByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.education?.findUnique({
    where: {
      id,
    },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      level: {
        select: {
          id: true,
          name: true,
        },
      },
      major: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const school_image = await getImageUrlFromClaudinary({
    publicId: result?.school?.image || "",
  });

  const resultDto = filterKeysObject({
    object: {
      ...result,
      school_name: result?.school?.name,
      major_name: result?.major?.name,
      level: result?.level?.name,
      school_image,
    },
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const upsertEducationDto = async (params: Education) => {
  const id = params.id ?? "";

  const dataDto = trimObject({
    id: params?.id,
    gpa: params.gpa,
    description: params.description,
    id_user: params.id_user,
    id_level: params.id_level,
    id_major: params.id_major,
    id_school: params.id_school,
    start_at: convertToISOString(params?.start_at),
    end_at: convertToISOString(params.end_at),
  });

  await validationParse({
    schema: educationSchema(!id),
    data: dataDto,
  });

  const result = id
    ? await prisma.education.update({
        where: {
          id,
        },
        data: dataDto,
      })
    : await prisma.education.create({
        data: dataDto,
      });
  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });
  return result ? resultDto : null;
};

export const deleteEducationByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.education?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;

  return result ? resultDto : null;
};
