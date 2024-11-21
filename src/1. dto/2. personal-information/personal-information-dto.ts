import prisma from "@0 db/prisma";
import personalInfoSchema from "@2. validation/2. personal-information/0. personal-information-schema";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import validationParse from "@_lib/helpers/validation-parse";
import { PersonalInformation } from "@prisma/client";

export const getPersonalInfoByAnyParamDto = async (params: {
  id_user?: string;
  id?: string;
}) => {
  const { id_user, id } = params;
  const result = await prisma.personalInformation.findFirst({
    where: {
      ...(id_user && { id_user }),
      ...(id && { id_user }),
    },
    include: {
      profession: {
        select: {
          name: true,
        },
      },
    },
  });
  const professional_image = await getImageUrlFromClaudinary({
    publicId: String(result?.professional_image),
  });

  const personalInfoDto = {
    ...result,
    professional_image,
  };

  return personalInfoDto;
};

export const upsertPersonalInformationDto = async (payload: PersonalInformation) => {
  const id = payload.id;

  const dataDTO = {
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
  };

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
    update: dataDTO,
    create: dataDTO,
  });

  return result ?? null;
};
