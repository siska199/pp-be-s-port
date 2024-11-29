import prisma from "@0 db/prisma";
import masterCompanySchema from "@2. validation/0.1 master-company-schema";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import {
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { MasterCompany } from "@prisma/client";

export const getListMasterCompanyDto = async () => {
  const result = await prisma.masterCompany?.findMany();
  const resultDto = await Promise.all(
    result?.map(async (company) => {
      const url_image = await getImageUrlFromClaudinary({
        publicId: company?.image as string,
      });
      return {
        id: company?.id,
        name: company?.name,
        image: url_image,
      };
    })
  );
  return result ? resultDto : [];
};

export const getMasterCompanyByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.findFirst({
    where: {
      id,
    },
  });

  const image_url = await getImageUrlFromClaudinary({
    publicId: String(result?.image),
  });

  const resultDto = {
    id: result?.id,
    name: result?.name,
    image: image_url,
  };
  return result ? resultDto : null;
};

export const upsertMasterCompanyDto = async (params: MasterCompany) => {
  const id = params?.id ?? "";
  const dataDto = {
    id,
    name: params.name,
    image: params?.image,
  };

  await validationParse({
    schema: masterCompanySchema(!id),
    data: dataDto,
  });

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
    update: removeKeyWithUndifienedValue(dataDto),
  });

  const resultDto = {
    id: result?.id,
    name: result?.name,
    image: result?.image,
  };

  return result ? resultDto : null;
};

export const deleteMasterCompanyByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.masterCompany?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};
