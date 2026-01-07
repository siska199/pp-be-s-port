import { getListSocialLinkService } from "../2. service/3. social-link-service";
import { getPersonalInfoByAnyParamService } from "../2. service/2. personal-information-service";
import { getListEducationService, TParamsListEducationDto } from "../2. service/4. education-service";
import { getListExperianceService } from "../2. service/5. experiance-service";
import { getListSkillUserCategoryService, getListSkillUserService, TParamsListSkillUserDto } from "../2. service/6. skill-user-service";
import { getListProjectService } from "../2. service/7. project-service";
import { mapEducationListQuery } from "../3. controllers/4. education-controller";
import { mapExperianceListQuery } from "../3. controllers/5. experiance-controller";
import { mapSkillUserListQuery } from "../3. controllers/6. skill-user-controller";
import { mapProjectListQuery } from "../3. controllers/7. project-controller";
import catchErrors from "../_lib/helpers/catch-error";
import message from "../_lib/helpers/message";
import { successResponse } from "../_lib/helpers/response";
import { TRequestAuthRoute } from "../_lib/types";
import { Response } from "express";
import { getListKeyMetricService } from '../2. service/2.1 key-metric';

export const getPersonalInformationPortofolio = catchErrors<TRequestAuthRoute>(
  async (req: TRequestAuthRoute, res: Response) => {
    const username = req.query.username?.toString();
    
    const result = await getPersonalInfoByAnyParamService({
      username
    });

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const getListSocialLinkPortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const username = req.query.username?.toString();

    const result = await getListSocialLinkService({
      username
    });
    successResponse({
      res,
      data: result,
      message: "Success Get Social links User",
    });
  }
);

export const getListKeyMetricPortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const username = req.query.username?.toString();

    const result = await getListKeyMetricService({
      username
    });
    successResponse({
      res,
      data: result,
      message: "Success Get Key Metric User",
    });
  }
);


export const getListSkillUserCategoryPortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const username =req.query.username?.toString() 

    const queryObject = {
        username,
        sort_dir :"asc"
    }

    const result = await getListSkillUserCategoryService(queryObject);
    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const getListSkillUserPortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const queryObject = {
      ...mapSkillUserListQuery(req),
      sort_dir : "asc"
    } as TParamsListSkillUserDto
    const result = await getListSkillUserService(queryObject);
    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const getListProjectPortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {

    const queryObject = mapProjectListQuery(req)
    const result = await getListProjectService({
      ...queryObject,
      is_show:'true'
    });
    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

export const getListExperiancePortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const queryObject = mapExperianceListQuery(req)
    const result = await getListExperianceService(queryObject);

    successResponse({
      res,
      message: message.success.getData,
      data: result,
    });
  }
);

export const getListEducationPortofolio = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const queryObject: TParamsListEducationDto = mapEducationListQuery(req)
    const result = await getListEducationService({
      ...queryObject,
      is_show:'true'

    });

    successResponse({
      res,
      data: result,
      message: message.success.getData,
    });
  }
);

