import prisma from "@0 db/prisma";
import masterEducationSchoolSchema from "@1. validation/0.6 master-education-school";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
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
      ...(id_level && { id_level }),
    },
    include: {
      level: {
        select: {
          id: true,
          name: true,
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
        id_level: data?.id_level,
        level: data?.level,
        image: image,
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
  params: MasterEducationSchool
) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params?.name,
    image: params?.image,
    id_level: params?.id_level,
  };

  await validationParse({
    schema: masterEducationSchoolSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.masterEducationSchool?.upsert({
    where: { id },
    create: dataDto,
    update: removeKeyWithUndifienedValue(dataDto),
    include: {
      level: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const resultDto = {
    id: result?.id,
    name: result?.name,
    level: result?.level,
    image: result?.image,
  };
  return result ? resultDto : null;
};

export const deleteMasterEducationSchoolByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationSchool?.delete({
    where: { id },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
