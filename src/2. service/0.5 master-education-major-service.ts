import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
} from "../_lib/helpers/function";
import prisma from "@_db/prisma";
import { MasterEducationLevel, MasterEducationMajor, MasterLevelMajorEducation } from "@prisma/client";

type TMasterEducationMajor = MasterEducationMajor & {
  levels: (MasterLevelMajorEducation & { level: MasterEducationLevel })[]
}
export const getListMasterEducationMajorService = async (params: {
  id_level: string;
}) => {
  const { id_level } = params;
  const result = await prisma?.masterEducationMajor?.findMany({
    where: {
      levels: {
        some: {
          level: {
            id: id_level,
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


  const resultDto = result?.map((data: TMasterEducationMajor) => ({
    id: data?.id,
    name: data?.name,
    levels: data?.levels?.map((level) => ({
      id: level?.level.id,
      name: level?.level.name,
    })),
  }));
  return result ? resultDto : [];
};

export const getMasterEducationMajorByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationMajor?.findUnique({
    where: {
      id,
    },
    include: {
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
    },
  }) as TMasterEducationMajor

  const resultDto = {
    id: result?.id,
    name: result?.name,
    levels: result?.levels?.map((level) => ({
      id: level?.level.id,
      name: level?.level.name,
    })),
  };

  return result ? resultDto : null;
};

export const createBulkMasterEducationMajorService = async (
  params: (MasterEducationMajor & { id_levels: string[] })[]
) => {
  const listData = params;
  const result = await Promise.all(
    listData?.map(async (singleData) => {
      const resulSignData = await upsertMasterEducationMajorByIdService(singleData);
      return resulSignData;
    })
  );

  const resultDto = {
    ...result,
  };

  return result ? resultDto : null;
};

export const upsertMasterEducationMajorByIdService = async (
  params: MasterEducationMajor & { id_levels?: string[] }
) => {
  const id = params?.id ?? "";

  const dataDto = trimObject({
    ...(id && { id }),
    name: params?.name,
    ...(params?.id_levels && {
      levels: {
        create: params?.id_levels?.map((id_level:string) => ({
          level: {
            connect: {
              id: id_level,
            },
          },
        })),
      },
    }),
  });

  const result = id
    ? await prisma?.masterEducationMajor?.update({
        where: {
          id,
        },
        data: removeKeyWithUndifienedValue(dataDto),
      })
    : await prisma?.masterEducationMajor?.create({
        data: dataDto,
      });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const deleteMasterEducationMajorByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationMajor?.findUnique({
    where: {
      id,
    },
  });

  const resultDto = result;

  return result ? resultDto : null;
};
