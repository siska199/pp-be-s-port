import prisma from "@0 db/prisma";
import masterEducationSchoolSchema from "@1. validation/0.6 master-education-school";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { MasterEducationSchool } from "@prisma/client";

export const getListMasterEducationSchoolDto = async (params: {
  id_level?: string;
}) => {
  const { id_level } = params;

  const result = await prisma?.masterEducationSchool?.findMany({
    where: {
      levels: {
        some: {
          level: {
            ...(id_level && { id: id_level }),
          },
        },
      },
    },
    include: {
      levels: {
        include: {
          level: true,
        },
      },
    },
  });

  const resultDto = await Promise.all(
    result?.map(async (data) => {
      const image = await getImageUrlFromClaudinary({
        publicId: data.image,
      });
      return {
        id: data?.id,
        name: data?.name,
        image: image,
        levels: data?.levels?.map((level) => ({
          id: level?.level.id,
          name: level?.level.name,
        })),
      };
    })
  );

  return result ? resultDto : [];
};

export const getMasterEducationSchoolByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationSchool?.findUnique({
    where: {
      id,
    },
  });

  const image = await getImageUrlFromClaudinary({
    publicId: String(result?.image),
  });

  const resultDto = {
    ...result,
    image,
  };
  return result ? resultDto : null;
};

export const upsertMasterEducationSchoolByIdDto = async (
  params: MasterEducationSchool & { id_levels: string[] }
) => {
  const id = params?.id ?? "";
  const dataDto = {
    ...(id && { id }),
    name: params?.name,
    image: params?.image,
    ...(params?.id_levels?.length > 0 && {
      levels: {
        create: params?.id_levels?.map((id_level) => ({
          level: {
            connect: {
              id: id_level,
            },
          },
        })),
      },
    }),
  };

  const include = {
    levels: {
      include: {
        level: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  };

  await validationParse({
    schema: masterEducationSchoolSchema(!id),
    data: {
      ...filterKeysObject({
        object: { ...dataDto },
        keys: ["levels"],
      }),
      id_levels: params?.id_levels,
    },
  });

  const result = id
    ? await prisma?.masterEducationSchool?.update({
        where: { id },
        data: removeKeyWithUndifienedValue(dataDto),
        include,
      })
    : await prisma?.masterEducationSchool?.create({
        data: dataDto,
        include,
      });

  const resultDto = filterKeysObject({
    object: {
      ...result,
      levels: result?.levels?.map((data) => ({
        id: data?.level?.id,
        name: data?.level?.name,
      })),
    },
    keys: ["created_at", "updated_at"],
  });
  return result ? resultDto : null;
};

export const createBulkMasterEducationSchoolDto = async (
  params: (MasterEducationSchool & { id_levels: string[] })[]
) => {
  const listData = params;

  console.log("list data: ", listData);

  const result = await Promise.all(
    listData?.map(async (singleData) => {
      const resultSingleDate = await upsertMasterEducationSchoolByIdDto(
        singleData
      );
      return resultSingleDate;
    })
  );

  const resultDto = {
    ...result,
  };

  return resultDto;
};

export const deleteMasterEducationSchoolByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationSchool?.delete({
    where: { id },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
