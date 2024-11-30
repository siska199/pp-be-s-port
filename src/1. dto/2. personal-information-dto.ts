import prisma from "@0 db/prisma";
import personalInfoSchema from "@2. validation/2. personal-information-schema";
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
  payload: PersonalInformation
) => {
  const id = payload.id ?? "";

  const dataDTO = trimObject({
    ...(id && { id }),
    id_user: payload.id_user,
    professional_image: payload.professional_image,
    first_name: payload?.first_name,
    last_name: payload?.last_name,
    province: payload?.province,
    city: payload?.city,
    district: payload?.district,
    postal_code: payload?.postal_code,
    phone_number: payload.phone_number,
    email: payload?.email,
    about_me: payload.about_me,
    bio: payload.bio,
    id_profession: payload.id_profession,
  });

  await validationParse({
    schema: personalInfoSchema(!id),
    data: dataDTO,
  });

  if (id && dataDTO.professional_image) {
    const currentPersonalInfo = await getPersonalInfoByAnyParamDto({
      id,
    });
    await deleteImageFromCloudinary(
      currentPersonalInfo?.professional_image || ""
    );
  }

  const result = await prisma.personalInformation.upsert({
    where: {
      id,
    },
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDTO),
      keys: ["id_user"],
    }),
    create: dataDTO,
    include: {
      profession: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};
