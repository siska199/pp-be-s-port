import prisma from "@_lib/db/prisma";
import catchErrors from "@_lib/helpers/catch-error";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { Response } from "express";

export const getSocialLinks = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const userAuth = req.user;
    const { page, total_items, current_page } = req.params;

    const skip = Number(page) * Number(total_items);
    const take = Number(total_items);

    const socialLinksUser = await prisma.socialLink.findMany({
      skip,
      take,
      where: {
        id_user: userAuth?.id,
      },
    });

    successResponse({
      res,
      data: socialLinksUser,
      message: "Success Get Social links User",
    });
  }
);

export const getSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_user = req.user?.id;
    const id = req.params.id;

    const socialLinkUser = await prisma.socialLink.findFirst({
      where: {
        id_user,
        id,
      },
    });

    successResponse({
      res,
      message: "Successfully get data",
      data: socialLinkUser,
    });
  }
);

export const editSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id_user = req.user?.id;
    const id = req.params.id;
    const body = req.body;

    const updateSocialLink = await prisma.socialLink.update({
      where: {
        id,
        id_user,
      },
      data: body,
    });

    successResponse({
      res,
      message: "Successfully update data",
      data: updateSocialLink,
    });
  }
);

export const deleteSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;
    const id_user = req.user?.id;

    await prisma.socialLink.delete({
      where: {
        id,
        id_user,
      },
    });
  }
);
