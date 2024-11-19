import {
  createBulkMasterSkillDto,
  createMasterSkillDto,
  deleteMasterSkillDto,
  getListMasterSkillDto,
  getMasterSkillByIdDto,
  updateMasterSkillByIdDto,
} from "@1. dto/0.8 master-skill/master-skill-dto";
import catchErrors from "@_lib/helpers/catch-error";
import message from "@_lib/helpers/message";
import { successResponse } from "@_lib/helpers/response";

import { Request, Response } from "express";

export const getListMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const id_category = req.query.id_category as string;
    const skills = await getListMasterSkillDto({ id_category });
    successResponse({
      res,
      data: skills,
      message: message.success.getData,
    });
  }
);

export const getMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const idSkill = req.params.id;
    const skill = await getMasterSkillByIdDto(idSkill);

    successResponse({
      res,
      data: skill,
      message: message.success.getData,
    });
  }
);

export const addMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await createMasterSkillDto(payload);

    successResponse({
      res,
      message: message.success.addData,
      data: result,
    });
  }
);

export const addBulkMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await createBulkMasterSkillDto(payload);

    successResponse({
      res,
      message: message?.success?.addData,
      data: result,
    });
  }
);

export const editMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const idSkill = req.params.id;
    const payload = req.body;
    const result = await updateMasterSkillByIdDto({
      id: idSkill,
      data: payload,
    });

    successResponse({
      res,
      data: result,
      message: message.success.editData,
    });
  }
);

export const deleteMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const idSkill = req.params.id;
    const result = await deleteMasterSkillDto(idSkill);
    successResponse({
      res,
      data: result,
      message: message.success.deleteData,
    });
  }
);
