import prisma from "@0 db/prisma";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import { MasterCompany } from "@prisma/client";

export const getListMasterCompanyDto = async () => {
  const result = await prisma.masterCompany?.findMany();
  const updatedResult = await Promise.all(
    result?.map(async (company) => {
      const url_image = await getImageUrlFromClaudinary({
        publicId: company?.image as string,
      });
      return {
        ...company,
        image: url_image,
      };
    })
  );
  return updatedResult ?? [];
};

export const getMasterCompanyByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.findFirst({
    where: {
      id,
    },
  });

  return result ?? null;
};

export const upsertMasterCompanyDto = async (params: MasterCompany) => {
  const id = params?.id ?? "";
  const dataDto = {
    name: params.name,
    image: params?.image,
  };

  if (dataDto.image && id) {
    const currMasterCompany = await prisma?.masterCompany?.findUnique({
      where: {
        id,
      },
    });
    await deleteImageFromCloudinary(String(currMasterCompany?.id));
  }

  const result = await prisma?.masterCompany?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: dataDto,
  });
  const masterCompanyDto = result;
  return result ? masterCompanyDto : null;
};

export const deleteMasterCompanyByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.delete({
    where: {
      id,
    },
  });
  return result ?? null;
};
