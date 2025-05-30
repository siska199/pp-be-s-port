import prisma from "@_db/prisma";
import masterCompanySchema from "@1. validation/0.1 master-company-schema";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
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
  const dataDto = trimObject({
    ...(id && { id }),
    name: params.name,
    image: params?.image,
  });

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

  const result = id
    ? await prisma?.masterCompany?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id"],
        }),
      })
    : await prisma?.masterCompany?.create({
        data: dataDto,
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
