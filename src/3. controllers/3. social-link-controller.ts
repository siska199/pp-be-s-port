import {
  upsertBulkSocialLinkService,
  deleteSocialLinkByIdService,
  getListSocialLinkService,
  upsertSocialLinkService,
  deleteSocialLinkByIdsService,
} from "../2. service/3. social-link-service";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute } from "../_lib/types";
import { SocialLink } from "@prisma/client";
import { Response } from "express";

export const getListSocialLink = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const user = req.user;

    const result = await getListSocialLinkService({
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

    const result = await upsertSocialLinkService({
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
    const id_user = req.user?.id;
    const result = await upsertBulkSocialLinkService(
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

  const result = await deleteSocialLinkByIdService(id);

  successResponse({
    res,
    data: result,
    message: message?.success?.deleteData,
  });
});

export const deleteSocialLinks = catchErrors(async (req, res) => {
  const ids = req.body;

  const result = await deleteSocialLinkByIdsService(ids);

  successResponse({
    res,
    data: result,
    message: message?.success?.deleteData,
  });
});