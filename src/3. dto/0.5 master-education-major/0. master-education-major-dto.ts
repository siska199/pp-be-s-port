import prisma from "@0 db/prisma";
import { MasterEducationMajor } from "@prisma/client";

export const createMasterEducationMajorDto = async (
  params: MasterEducationMajor & { id_levels: string[] }
) => {
  const { name, id_levels } = params;
  const result = await prisma.masterEducationMajor?.create({
    data: {
      name,
      levels: {
        create: id_levels?.map((id_level) => ({
          level: {
            connect: {
              id: id_level,
            },
          },
        })),
      },
    },
  });

  return result ?? null;
};

export const createBulkMasterEducationMajorDto = async (
  params: (MasterEducationMajor & { id_levels: string[] })[]
) => {
  const data = params;

  const result = Promise.all(
    data?.map(async (singleData) => {
      const resulSignData = await createMasterEducationMajorDto(singleData);
      return resulSignData;
    })
  );

  return result ?? null;
};

export const getListMasterEducationMajorDto = async (params: {
  id_level: string;
}) => {
  const { id_level } = params;
  const result = await prisma?.masterEducationMajor?.findMany({
    where: {
      levels: {
        some: {
          id: id_level,
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

export const updateMasterEducationMajorByIdDto = async (params: {
  id: string;
  data: MasterEducationMajor & { id_levels?: string[] };
}) => {
  const { id, data } = params;

  const result = null;
  // await prisma?.masterEducationMajor?.update({
  //   where: {
  //     id,
  //   },
  //   data: {
  //     ...(data?.name && { name: data?.name }),
  //     ...(data?.id_levels && {
  //       levels: {
  //         set: data?.id_levels?.map((id_level) => ({ id_level })),
  //       },
  //     }),
  //   },
  // });

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
