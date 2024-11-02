import prisma from "@_lib/db/prisma";
import { PersonalInformation } from "@prisma/client";

export const getPersonalInfoByIdUser = async (id_user: string) => {
  const personalInfo = await prisma.personalInformation.findFirst({
    where: {
      id_user,
    },
    include: {
      profession: {
        select: {
          name: true,
        },
      },
    },
  });

  return personalInfo;
};
interface TCreatePersonalInfoDTO
  extends Omit<PersonalInformation, "id" | "created_at" | "updated_at"> {}

export const createPersonalInfo = async (payload: TCreatePersonalInfoDTO) => {
  const personalInfoDTO: TCreatePersonalInfoDTO = {
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

  return await prisma.personalInformation.create({
    data: {
      ...personalInfoDTO,
    },
  });
};

interface TUpdatePersonalInfoDTO
  extends Omit<
    PersonalInformation,
    "id" | "created_at" | "updated_at" | "id_user"
  > {}
export const updatePersonalInfo = async (params: {
  id_user: string;
  id: string;
  payload: TUpdatePersonalInfoDTO;
}) => {
  const { id, id_user, payload } = params;

  const personalInfoDTO: TUpdatePersonalInfoDTO = {
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

  return await prisma.personalInformation.update({
    where: {
      id_user,
      id,
    },
    data: {
      ...payload,
      ...personalInfoDTO,
    },
  });
};
