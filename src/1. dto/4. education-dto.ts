import prisma from "@0 db/prisma";
import { Education } from "@prisma/client";
import { TQueryParamsPaginationList } from "@_lib/types/index";
import {
  convertToISOString,
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import educationSchema from "@2. validation/4. education-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";

type TParamsListEducationDto = TQueryParamsPaginationList<keyof Education> & {
  id_level?: string;
  id_user: string;
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
  } = params;

  const skip = (page_no - 1) * items_perpage;
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
                },
              },
            },
            {
              major: {
                name: {
                  contains: search,
                },
              },
            },
          ],
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
    total_items: await prisma?.education?.count(),
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

  const dataDto = {
    id: params?.id,
    gpa: params.gpa,
    description: params.description,
    id_user: params.id_user,
    id_level: params.id_level,
    id_major: params.id_major,
    id_school: params.id_school,
    start_at: convertToISOString(params?.start_at),
    end_at: convertToISOString(params.end_at),
  };

  await validationParse({
    schema: educationSchema(!id),
    data: dataDto,
  });

  const result = await prisma.education.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_user"],
    }),
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
  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });
  return result ? resultDto : null;
};
