import {
  upsertBulkSocialLinkDto,
  deleteSocialLinkByIdDto,
  getListSocialLinkDto,
  upsertSocialLinkDto,
} from "@2. dto/3. social-link-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import { TRequestAuthRoute } from "@_lib/types";
import { SocialLink } from "@prisma/client";
import { Response } from "express";

export const getListSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;

    const result = await getListSocialLinkDto({
      id_user: String(user?.id),
    });
    successResponse({
      res,
      data: result,
      message: "Success Get Social links User",
    });
  }
);

export const upsertSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;
    const payload = req.body;

    const result = await upsertSocialLinkDto({
      ...payload,
      id_user: user?.id,
    });

    successResponse({
      res,
      data: result,
      message: message.success.upserData(payload.id),
    });
  }
);

export const upsertBulkSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res) => {
    const payload = req.body;
    const id_user = req.user;
    const result = await upsertBulkSocialLinkDto(
      payload?.map((data: Omit<SocialLink, "created_at" | "updated_at">) => ({
        ...data,
        id_user,
      }))
    );

    successResponse({
      res,
      data: result,
      message: message?.success?.addData,
    });
  }
);

export const deleteSocialLink = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const result = await deleteSocialLinkByIdDto(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.deleteData,
  });
});
