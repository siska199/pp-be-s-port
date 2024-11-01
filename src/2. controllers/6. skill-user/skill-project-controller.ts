import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import {
  deleteSkillProject,
  getListSkillProject,
  getSkillProjectById,
  insertSkillProject,
  updateSkillProject,
} from "@query/skill/skill-project-query";
import { TRequestAuthRoute } from "@types";
import { Request, Response } from "express";

export const getSkillsProject = catchErrors(
  async (req: Request, res: Response) => {
    const idProject = req.query.id_project as string;

    const skillsProject = await getListSkillProject(idProject);

    successResponse({
      res,
      data: skillsProject,
      message: message?.success.getData,
    });
  }
);

export const getSkillProject = catchErrors(async (req, res) => {
  const id = req.params?.id;

  const skillProject = await getSkillProjectById(id);

  successResponse({
    res,
    data: skillProject,
    message: message?.success?.getData,
  });
});

export const addSkillProject = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const idUser = req.user?.id;
    const payload = req.body;

    await insertSkillProject({
      ...payload,
      id_user: idUser,
    });

    successResponse({
      res,
      message: message?.success?.addData,
    });
  }
);

export const editSkillProject = catchErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    await updateSkillProject({ id, payload });

    successResponse({
      res,
      message: message?.success?.editData,
    });
  }
);

export const removeSkillProject = catchErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    await deleteSkillProject(id);

    successResponse({
      res,
      message: message?.success?.deleteData,
    });
  }
);
