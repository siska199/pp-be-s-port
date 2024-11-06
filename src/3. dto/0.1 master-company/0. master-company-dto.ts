import prisma from "@_lib/db/prisma";
import validationParse from "@_lib/helpers/validation-parse";
import masterCompanySchema from "@_lib/validation/0.1 master-copany/0. master-company-schema";
import { MasterCompany } from "@prisma/client";

export const createMasterCompanyDto = async (params: MasterCompany) => {
  const dataDto = {
    name: params.name,
  };

  const validation = await validationParse({
    schema: masterCompanySchema(),
    data: dataDto,
  });
  console.log("validation", validation);
  const result = await prisma?.masterCompany?.create({
    data: dataDto,
  });

  return result ?? null;
};

export const createBulkMasterCompanyDto = async (params: MasterCompany[]) => {
  const listDataDto = params?.map((data) => ({
    name: data.name,
  }));

  const validation = await Promise.all(
    listDataDto?.map(async (masterCompany) => {
      await validationParse({
        schema: masterCompanySchema(),
        data: { name: masterCompany.name },
      });
    })
  );

  console.log("validation: ", validation);

  const result = await prisma?.masterCompany?.createMany({
    data: params,
  });
  return result ?? null;
};

export const getListMasterCompanyDto = async () => {
  const result = await prisma.masterCompany?.findMany();
  return result ?? [];
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

  const validation = await validationParse({
    schema: masterCompanySchema(),
    data: dataDto,
  });
  console.log("validation", validation);
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
