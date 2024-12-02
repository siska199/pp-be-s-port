import prisma from "@0 db/prisma";
import userSchema from "@1. validation/1. user-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
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
      OR: [
        {
          ...(paramsDto?.id && { id: paramsDto?.id }),
        },
        {
          ...(paramsDto?.email && { email: paramsDto?.email }),
        },
        {
          ...(paramsDto?.username && { username: paramsDto?.username }),
        },
      ],
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

  const resultDto = filterKeysObject({
    object: {
      ...result,
      image: image_url || "",
    },
    keys: [],
  });

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

  const result = id
    ? await prisma?.user?.update({
        where: {
          id,
        },
        data: removeKeyWithUndifienedValue(dataDto),
      })
    : await prisma?.user?.create({
        data: dataDto,
      });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at", "password"],
  });
  return resultDto;
};
