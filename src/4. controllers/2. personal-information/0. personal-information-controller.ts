import prisma from "@0 db/prisma";
import {
  createPersonalInfo,
  getPersonalInfoByIdUser,
  updatePersonalInfo,
} from "@1. dto/2. personal-information/personal-information-dto";
import catchErrors from "@_lib/helpers/catch-error";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { CustomError } from "@_lib/middleware/error-handler";
import { TRequestAuthRoute } from "@_lib/types";
import { PersonalInformation } from "@prisma/client";
import { Response } from "express";

export const getPersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_user = req.user?.id as string;

    const personalInformation = await getPersonalInfoByIdUser(id_user);
    if (!personalInformation)
      throw new CustomError(message.error.notFound, 400);

    const url_professional_image = await getImageUrlFromClaudinary({
      publicId: personalInformation?.professional_image as string,
    });

    successResponse({
      res,
      data: {
        ...personalInformation,
        professional_image: url_professional_image,
      },
      message: message.success.getData,
    });
  }
);

export const addPersonaInformation = catchErrors<TRequestAuthRoute>(
  async (req, res) => {
    const payload = req.body;
    const id_user = req.user?.id as string;

    const personalInformation = await getPersonalInfoByIdUser(id_user);
    if (personalInformation?.id)
      throw new CustomError(
        "A personal information record already exists for this user.",
        400
      );

    const createdPersonalInformation = await createPersonalInfo({
      ...payload,
      id_user,
    });

    successResponse({
      res,
      data: createdPersonalInformation,
      message: message.success.editData,
    });
  }
);

export const editPersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;
    const id_user = req.user?.id as string;
    const payload: PersonalInformation = req.body;

    const personalInformation = await getPersonalInfoByIdUser(id_user);

    if (payload.professional_image) {
      await deleteImageFromCloudinary(
        personalInformation?.professional_image as string
      );
    }

    const updatePersonalInformation = await updatePersonalInfo({
      id_user,
      id,
      payload,
    });

    const url_professional_image = await getImageUrlFromClaudinary({
      publicId: updatePersonalInformation?.professional_image as string,
    });

    successResponse({
      res,
      data: {
        ...updatePersonalInformation,
        professional_image: url_professional_image,
      },
      message: message.success.editData,
    });
  }
);

export const deletePersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req, res) => {
    const id = req.params.id;
    const id_user = req.user?.id as string;

    const personalInformation = await getPersonalInfoByIdUser(id_user);
    if (!personalInformation)
      throw new CustomError(message.error.notFound, 400);

    await prisma.personalInformation.delete({
      where: {
        id,
        id_user,
      },
    });

    successResponse({
      res,
      message: message.success.deleteData,
    });
  }
);
