import prisma from "@db/prisma";
import { PersonalInformation } from "@prisma/client";

interface TGetPersonalInfoDTO
  extends Partial<
    Omit<PersonalInformation, "id" | "created_at" | "updated_at">
  > {
  profession?: string;
}

export const getPersonalInfoByIdUser = async (
  id_user: string
): Promise<TGetPersonalInfoDTO> => {
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

  const personalInfoDTO: TGetPersonalInfoDTO = {
    professional_image: personalInfo?.professional_image,
    first_name: personalInfo?.first_name,
    last_name: personalInfo?.last_name,
    province: personalInfo?.province,
    city: personalInfo?.city,
    district: personalInfo?.district,
    postal_code: personalInfo?.postal_code,
    phone_number: personalInfo?.phone_number,
    email: personalInfo?.email,
    about_me: personalInfo?.about_me,
    bio: personalInfo?.bio,
    profession: personalInfo?.profession?.name,
    id_profession: personalInfo?.id_profession,
  };
  return personalInfoDTO;
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
