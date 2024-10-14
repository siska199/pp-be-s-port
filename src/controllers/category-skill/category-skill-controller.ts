import catchErrors from "@helpers/catch-error";
import message from "@helpers/message";
import { successResponse } from "@helpers/response";
import {
  getListCategorySkill,
  insertBulkCategorySkill,
} from "@query/category-skill/category-skill-query";
import { TRequestAuthRoute } from "@types";
import { Response } from "express";

export const getCategoriesSkill = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const cotegoriesSkill = await getListCategorySkill();
    successResponse({
      res,
      data: cotegoriesSkill,
      message: message.success.getData,
    });
  }
);


export const addCategorySkill = catchErrors(async(req: TRequestAuthRoute, res: Response)=>{
  const categorySkill = req.body
  
})

export const addBulkCategorySkill = catchErrors(
  async (req: TRequestAuthRoute, res: Response) => {
    const categoriesSkill = req.body;
    await insertBulkCategorySkill(categoriesSkill);
    successResponse({
      res,
      message: message.success.addData,
    });
  }
);
