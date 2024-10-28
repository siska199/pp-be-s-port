import prisma from "@db/prisma";
import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import {
  createPersonalInfo,
  getPersonalInfoByIdUser,
} from "@query/personal-information/personal-information-query";
import { TRequestAuthRoute } from "@types";
import { Response } from "express";
import { updatePersonalInfo } from "@query/personal-information/personal-information-query";
import { CustomError } from "@middleware/error-handler";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@helpers/claudinary";
import { PersonalInformation } from "@prisma/client";

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
