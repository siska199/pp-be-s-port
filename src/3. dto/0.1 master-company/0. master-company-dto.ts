import prisma from "@0 db/prisma";
import masterCompanySchema from "@4. validation/0.1 master-company/0. master-company-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import validationParse from "@_lib/helpers/validation-parse";
import { MasterCompany } from "@prisma/client";

export const createMasterCompanyDto = async (params: MasterCompany) => {
  const dataDto = {
    name: params.name,
    image: params?.image,
  };

  await validationParse({
    schema: masterCompanySchema(),
    data: dataDto,
  });

  const result = await prisma?.masterCompany?.create({
    data: dataDto,
  });

  return result ?? null;
};

export const createBulkMasterCompanyDto = async (params: MasterCompany[]) => {
  const listDataDto = params?.map((data) => ({
    name: data.name,
  }));

  await Promise.all(
    listDataDto?.map(async (masterCompany) => {
      await validationParse({
        schema: masterCompanySchema(),
        data: { name: masterCompany.name },
      });
    })
  );

  const result = await prisma?.masterCompany?.createMany({
    data: params,
  });
  return result ?? null;
};

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

export const updateMasterCompanyByIdDto = async (params: {
  id: string;
  data: MasterCompany;
}) => {
  const id = params?.id;
  const dataDto = {
    name: params?.data?.name,
  };

  await validationParse({
    schema: masterCompanySchema(),
    data: dataDto,
  });

  const result = await prisma?.masterCompany?.update({
    where: {
      id,
    },
    data: dataDto,
  });
  return result ?? null;
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
