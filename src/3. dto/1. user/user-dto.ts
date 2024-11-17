import prisma from "@0 db/prisma";
import validationParse from "@_lib/helpers/validation-parse";
import userSchema from "@_lib/validation/1. user/0. user-schema";
import { User } from "@prisma/client";

export const getUserBy_Dto = async (params: Partial<User>) => {
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

  return result ?? null;
};

export const createUserDto = async (payload: User) => {
  const dataDto = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: payload.password,
    phone_number: payload.phone_number,
    image: payload.image,
    id_profession: payload.id_profession,
  };

  const validation = await validationParse({
    schema: userSchema(),
    data: dataDto,
  });
  console.log("validation: ", validation);

  const result = await prisma.user.create({
    data: dataDto,
  });

  return result ?? null;
};
