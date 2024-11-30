import {
  deleteMasterSkillByIdDto,
  getListMasterSkillDto,
  getMasterSkillByIdDto,
  upsertMasterSkillDto,
} from "@2. dto/0.8 master-skill-dto";
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

export const getMasterSkillById = catchErrors(
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

export const upsertMasterSkill = catchErrors(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await upsertMasterSkillDto(payload);

    successResponse({
      res,
      message: message.success.addData,
      data: result,
    });
  }
);

export const deleteMasterSkillById = catchErrors(
  async (req: Request, res: Response) => {
    const idSkill = req.params.id;
    const result = await deleteMasterSkillByIdDto(idSkill);
    successResponse({
      res,
      data: result,
      message: message.success.deleteData,
    });
  }
);
