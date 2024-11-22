import prisma from "@0 db/prisma";
import { MasterEducationMajor } from "@prisma/client";

export const getListMasterEducationMajorDto = async (params: {
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

  console.log("result: ", result);
  const resultDto = result?.map((data) => ({
    id: data?.id,
    name: data?.name,
    levels: data?.levels?.map((level) => ({
      id: level?.level.id,
      name: level?.level.name,
    })),
  }));
  return result ? resultDto : [];
};

export const getMasterEducationMajorByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationMajor?.findUnique({
    where: {
      id,
    },
    include: {
      levels: {
        include: {
          level: true,
        },
      },
    },
  });

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

export const createBulkMasterEducationMajorDto = async (
  params: (MasterEducationMajor & { id_levels: string[] })[]
) => {
  const data = params;

  const result = Promise.all(
    data?.map(async (singleData) => {
      const resulSignData = await upsertMasterEducationMajorByIdDto(singleData);
      return resulSignData;
    })
  );

  return result ?? null;
};

export const upsertMasterEducationMajorByIdDto = async (
  params: MasterEducationMajor & { id_levels?: string[] }
) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
    ...(params?.id_levels && {
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

  const result = await prisma?.masterEducationMajor?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });

  return result ?? null;
};

export const deleteMasterEducationMajorByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationMajor?.findUnique({
    where: {
      id,
    },
  });

  return result ?? null;
};
