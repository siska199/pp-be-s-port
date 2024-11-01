
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";
import {
  deleteSkill,
  getListSkill,
  getSkillById,
  insertSkill,
  insertSkillBulk,
  updateSkill,
} from "@query/skill/skill-query";
import { Request, Response } from "express";

export const getSkills = catchErrors(async (req: Request, res: Response) => {
  const skills = await getListSkill();
  successResponse({
    res,
    data: skills,
    message: message.success.getData,
  });
});

export const getSkill = catchErrors(async (req: Request, res: Response) => {
  const idSkill = req.params.id;
  const skill = await getSkillById(idSkill);

  successResponse({
    res,
    data: skill,
    message: message.success.getData,
  });
});

export const addSkill = catchErrors(async (req: Request, res: Response) => {
  const payload = req.body;
  await insertSkill(payload);

  successResponse({
    res,
    message: message.success.addData,
  });
});

export const addSkillBulk = catchErrors(async (req: Request, res: Response) => {
  const payload = req.body;
  await insertSkillBulk(payload);

  successResponse({
    res,
    message: message?.success?.addData,
  });
});

export const editSkill = catchErrors(async (req: Request, res: Response) => {
  const idSkill = req.params.id;
  const payload = req.body;
  await updateSkill({ idSkill, payload });

  successResponse({
    res,
    data: payload,
    message: message.success.editData,
  });
});

export const removeSkill = catchErrors(async (req: Request, res: Response) => {
  const idSkill = req.params.id;
  await deleteSkill(idSkill);
  successResponse({
    res,
    message: message.success.deleteData,
  });
});
