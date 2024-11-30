import prisma from "@0 db/prisma";
import userSchema from "@1. validation/1. user-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { User } from "@prisma/client";

export const getUserByAnyParamDto = async (params: Partial<User>) => {
  const paramsDto = {
    id: params?.id,
    email: params?.email,
    username: params?.username,
  };
  const result = await prisma.user.findFirst({
    where: {
      ...(paramsDto?.id && { id: paramsDto?.id }),
      ...(paramsDto?.email && { email: paramsDto?.email }),
      ...(paramsDto?.username && { username: paramsDto?.username }),
    },
    include: {
      profession: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const image_url = await getImageUrlFromClaudinary({
    publicId: String(result?.image),
  });

  const resultDto = {
    id: result?.id,
    first_name: result?.first_name,
    last_name: result?.last_name,
    username: result?.username,
    email: result?.email,
    password: result?.password,
    phone_number: result?.phone_number,
    image: image_url,
    id_profession: result?.id_profession,
    profession: result?.profession,
  };

  return result ? resultDto : null;
};

export const upsertUserDto = async (params: User) => {
  const id = params.id ?? "";
  const dataDto = trimObject({
    ...(id && { id }),
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    password: params.password,
    phone_number: params.phone_number,
    image: params.image,
    id_profession: params.id_profession,
    username: params?.username,
  });

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
    include: {
      profession: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const resultDto = {
    id: result?.id,
    first_name: result?.first_name,
    last_name: result?.last_name,
    username: result?.username,
    email: result?.email,
    password: result?.password,
    phone_number: result?.phone_number,
    image: result?.image,
    id_profession: result?.id_profession,
    profession: result?.profession,
  };
  return resultDto;
};
