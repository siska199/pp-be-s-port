import prisma from "@db/prisma";
import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import { getPersonalInfoByIdUser } from "@query/user/personal-information-query";
import { TRequestAuthRoute } from "@types";
import { Response } from "express";

export const getPersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const userAuth = req.user;

    const personalInformationUser = await getPersonalInfoByIdUser(
      userAuth?.id || ""
    );

    successResponse({
      res,
      data: personalInformationUser,
      message: message.success.getData,
    });
  }
);

export const editPersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;
    const userAuth = req.user;
    const payload = req.body;

    const updatePersonalInformation = await prisma.personalInformation.update({
      where: {
        id,
        id_user: userAuth?.id,
      },
      data: {
        ...payload,
      },
    });

    successResponse({
      res,
      data: updatePersonalInformation,
      message: message.success.editData,
    });
  }
);

export const deletePersonalInformation = catchErrors<TRequestAuthRoute>(
  async (req, res) => {
    const id = req.params.id;
    const userAuth = req.user;

    await prisma.personalInformation.delete({
      where: {
        id,
        id_user: userAuth?.id,
      },
    });

    successResponse({
      res,
      message: message.success.deleteData,
    });
  }
);
