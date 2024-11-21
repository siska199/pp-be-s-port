import prisma from "@0 db/prisma";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import { MasterEducationSchool } from "@prisma/client";

export const createMasterEducationSchoolDto = async (
  params: MasterEducationSchool
) => {
  const data = params;

  const result = await prisma?.masterEducationSchool?.create({
    data,
  });

  return result ?? null;
};

export const createBulkMasterEducationSchoolDto = async (
  params: MasterEducationSchool[]
) => {
  const data = params;

  const result = await prisma?.masterEducationSchool?.createMany({
    data,
  });

  return result ?? null;
};

export const getListMasterEducationSchoolDto = async (params: {
  id_level?: string;
}) => {
  const { id_level } = params;
  const result = await prisma?.masterEducationSchool?.findMany({
    where: {
      ...(id_level && { id_level }),
    },
  });

  const updateResult = await Promise.all(
    result?.map(async (data) => {
      const url_image = await getImageUrlFromClaudinary({
        publicId: data.image,
      });
      return {
        ...data,
        image: url_image,
      };
    })
  );
  return updateResult ?? [];
};

export const getMasterEducationSchoolByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationSchool?.findUnique({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const updateMasterEducationSchoolByIdDto = async (params: {
  id: string;
  data: MasterEducationSchool;
}) => {
  const { id, data } = params;

  const result = await prisma?.masterEducationSchool?.update({
    where: { id },
    data: {
      ...data,
    },
  });
  return result ?? null;
};

export const deleteMasterEducationSchoolDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationSchool?.delete({
    where: { id },
  });

  return result ?? null;
};
