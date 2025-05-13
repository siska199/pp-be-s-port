import prisma from "@_db/prisma";
import personalInfoSchema from "@1. validation/2. personal-information-schema";
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
import { PersonalInformation } from "@prisma/client";

export const getPersonalInfoByAnyParamDto = async (params: {
  id_user?: string;
  id?: string;
}) => {
  const { id_user, id } = params;
  const result = await prisma.personalInformation.findFirst({
    where: {
      ...(id_user && { id_user }),
      ...(id && { id }),
    },
    include: {
      profession: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const professional_image = await getImageUrlFromClaudinary({
    publicId: result?.professional_image || "",
  });

  const resultDto = filterKeysObject({
    object: {
      ...result,
      professional_image,
    },
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const upsertPersonalInformationDto = async (
  params: PersonalInformation
) => {
  const id = params.id ?? "";

  const dataDTO = trimObject({
    ...(id && { id }),
    id_user: params.id_user,
    first_name: params?.first_name,
    last_name: params?.last_name,
    id_province: params?.id_province,
    id_city: params?.id_city,
    id_district: params?.id_district,
    id_postal_code: params?.id_postal_code,
    phone_number: params.phone_number,
    email: params?.email,
    about_me: params.about_me,
    bio: params.bio,
    id_profession: params.id_profession,
    professional_image: params.professional_image,
  });

  await validationParse({
    schema: personalInfoSchema(!id),
    data: dataDTO,
  });

  if (id && dataDTO.professional_image) {
    const currentPersonalInfo = await prisma.personalInformation.findFirst({
      where: {
        id,
      },
    });

    await deleteImageFromCloudinary(
      currentPersonalInfo?.professional_image || ""
    );
  }

  const result = id
    ? await prisma.personalInformation.update({
        where: {
          id_user: dataDTO?.id_user,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDTO),
          keys: ["id_user", "id"],
        }),
      })
    : await prisma?.personalInformation.create({
        data: dataDTO,
      });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};
