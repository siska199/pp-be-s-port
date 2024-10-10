import prisma from "@db/prisma";
import catchErrors from "@helpers/catch-error";
import { successResponse } from "@helpers/response";
import { TRequestAuthRoute } from "@types";
import { Response } from "express";

export const getPersonalInformation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;
    const userAuth = req.user;

    const personalInformationUser = await prisma.personalInformation.findFirst({
      where: {
        id_user: userAuth.id,
        id,
      },
    });
    successResponse({
      res,
      data: personalInformationUser,
      message: "Successfully Get Data Personal information",
    });
  }
);

export const editPersonalInformation = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;
    const userAuth = req.user;
    const body = req.body;

    const updatePersonalInformation = await prisma.personalInformation.update({
      where: {
        id,
        id_user: userAuth.id,
      },
      data: {
        ...body,
      },
    });

    successResponse({
      res,
      data: updatePersonalInformation,
      message: "Successfully edit data personal information",
    });
  }
);

export const deletePersonalInformation = catchErrors(async (req, res) => {
  const id = req.params.id;
  const userAuth = req.user;

  await prisma.personalInformation.delete({
    where: {
      id,
      id_user: userAuth.id,
    },
  });

  successResponse({
    res,
    message: "Successfully delete data",
  });
});
