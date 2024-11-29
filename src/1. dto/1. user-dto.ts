import prisma from "@0 db/prisma";
import userSchema from "@2. validation/1. user-schema";
import userSchmea from "@2. validation/1. user-schema";
import {
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { User } from "@prisma/client";

export const getUserByAnyParamDto = async (params: Partial<User>) => {
  const paramsDto = {
    id: params?.id,
    email: params?.email,
  };
  const result = await prisma.user.findFirst({
    where: {
      ...(paramsDto?.id && { id: paramsDto?.id }),
      ...(paramsDto?.email && { email: paramsDto?.email }),
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};

export const upsertUserDto = async (params: User) => {
  const id = params.id ?? "";
  const dataDto = {
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    password: params.password,
    phone_number: params.phone_number,
    image: params.image,
    id_profession: params.id_profession,
  };

  await validationParse({
    schema: userSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.user?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: removeKeyWithUndifienedValue(dataDto),
  });

  const resultDto = result;
  return resultDto;
};
