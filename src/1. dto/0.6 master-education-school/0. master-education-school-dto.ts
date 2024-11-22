import prisma from "@0 db/prisma";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import { MasterEducationSchool } from "@prisma/client";

export const getListMasterEducationSchoolDto = async (params: {
  id_level?: string;
}) => {
  const { id_level } = params;
  const result = await prisma?.masterEducationSchool?.findMany({
    where: {
      ...(id_level && { id_level }),
    },
  });

  const listMasterEducationSchoolDto = await Promise.all(
    result?.map(async (data) => {
      const image = await getImageUrlFromClaudinary({
        publicId: data.image,
      });
      return {
        ...data,
        image: image,
      };
    })
  );

  return result ? listMasterEducationSchoolDto : [];
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
  const masterEducationSchool = {
    ...result,
    image,
  };
  return result ? masterEducationSchool : null;
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

  const result = await prisma?.masterEducationSchool?.upsert({
    where: { id },
    create: dataDto,
    update: dataDto,
  });

  const masterEducationSchool = result;
  return result ? masterEducationSchool : null;
};

export const deleteMasterEducationSchoolByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.masterEducationSchool?.delete({
    where: { id },
  });

  return result ?? null;
};
