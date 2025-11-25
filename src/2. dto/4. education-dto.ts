import prisma from "@_db/prisma";
import educationSchema from "@1. validation/4. education-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  convertToISOString,
  filterKeysObject,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { TQueryParamsPaginationList } from "@_lib/types/index";
import { Education, Prisma } from "@prisma/client";

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
    page_no = 1,
    items_perpage = 10,
    sort_by = "start_at",
    sort_dir = "desc",
    keyword,
    id_level,
    id_user,
    start_at,
    end_at,
  } = params;

  const skip = (Number(page_no) - 1) * Number(items_perpage);
  const take = items_perpage;

  const relationOrderMap: Record<string, Prisma.EducationOrderByWithRelationInput> = {
    level_name: { level: { name: sort_dir } },
    school_name: { school: { name: sort_dir } },
    major_name: { major: { name: sort_dir } },
  };

  const orderBy: Prisma.EducationOrderByWithRelationInput | undefined =
    sort_by ? relationOrderMap[sort_by] || { [sort_by as keyof Prisma.EducationOrderByWithRelationInput]: sort_dir } : undefined;

  const whereFilter: Prisma.EducationWhereInput = {
    ...(id_user && { id_user }),
    AND: [
      {
        OR: [
          {
            school: {
              is: {
                name: { contains: keyword || "", mode: "insensitive" },
              },
            },
          },
          {
            major: {
              is: {
                name: { contains: keyword || "", mode: "insensitive" },
              },
            },
          },
        ],
      },
      ...(id_level
        ? [{ level: { is: { id: id_level } } }]
        : []),
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

  const result = await prisma.education.findMany({
    ...(skip && { skip }),
    ...(take && { take }),
    where: whereFilter,
    orderBy,
    include: {
      school: { select: { id: true, name: true } },
      level: { select: { id: true, name: true } },
      major: { select: { id: true, name: true } },
    },
  });

  const items = result.map((data) => ({
    ...data,
    school_name: data.school?.name,
    major_name: data.major?.name,
    level_name: data.level?.name,
  }));

  const totalItems = await prisma.education.count({ where: whereFilter });
  const totalPages = Math.ceil(totalItems / (items_perpage || 1));

  return {
    items,
    total_items: totalItems,
    total_pages: totalPages,
    current_page: page_no,
  };
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
      level_name: result?.level?.name,
      school_name: result?.school?.name,
      major_name: result?.major?.name,
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

  const include = {
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
    school: {
      select: {
        name: true,
        id: true,
      },
    },
  };
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
        include,
      })
    : await prisma.education.create({
        data: dataDto,
        include,
      });
  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });
  return result ? resultDto : null;
};

export const createBulkEducationDto = async (params: Education[]) => {
  const dataDto = params?.map((data) => ({
    ...trimObject({
      gpa: data.gpa,
      description: data.description,
      id_user: data.id_user,
      id_level: data.id_level,
      id_major: data.id_major,
      id_school: data.id_school,
      start_at: convertToISOString(data?.start_at),
      end_at: convertToISOString(data.end_at),
    }),
  }));

  const result = await prisma?.education?.createMany({
    data: dataDto,
  });

  const resultDto = result;

  return resultDto;
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
