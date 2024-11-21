import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import {
  deleteUserSkill,
  getListSkillUser,
  getSkillUserById,
  insertSkillUser,
  TParamsGetListSkillUser,
  updateSkillUser,
} from "@query/skill/skill-user-query";
import { TRequestAuthRoute } from "@types";
import { Request, Response } from "express";

export const getSkillsUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const idUser = req.user?.id as string;
    const queryObject = {
      page_no: Number(req.query.page_no),
      items_perpage: Number(req.query.items_perpage),
    };

    const skillsUser = await getListSkillUser({ idUser, queryObject });
    successResponse({
      res,
      data: skillsUser,
      message: message.success.getData,
    });
  }
);

export const getSkillUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const id = req.params.id;
    const idUser = req.user?.id as string;

    const skillUser = await getSkillUserById({
      id,
      idUser,
    });

    successResponse({
      res,
      data: skillUser,
      message: message?.success.getData,
    });
  }
);

export const addSkillUser = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const payload = req.body;
    const idUser = req.user?.id;

    await insertSkillUser({
      ...payload,
      id_user: idUser,
    });
  }
);

export const editSkillUser = catchErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    await updateSkillUser({
      id,
      payload,
    });

    successResponse({
      res,
      message: message.success.editData,
    });
  }
);

export const removeSkillUser = catchErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    await deleteUserSkill(id);
  }
);
