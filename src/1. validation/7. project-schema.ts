import { CategoryProject, TypeProject } from "@prisma/client";
import { z } from "zod";
import { zBoolean, zDatetime, zEnum, zString } from "../1. validation/reusable-shema";

const projectSchema = (mandatory = true) =>
  z
    ?.object({
      id: zString({ name: "ID", mandatory: false }),
      name: zString({
        name: "Name",
        mandatory,
      }),
      thumbnail_image: zString({
        name: "Thumbnail Image",
        mandatory:false,
      }),
      description: zString({
        max:10000,
        name: "Description",
        mandatory,
      }),
      category: zEnum({
        name: "Category",
        enum: [
          CategoryProject.API,
          CategoryProject.MOBILE,
          CategoryProject.UI_UX,
          CategoryProject.WEBSITE,
        ],
      }),
      type: zEnum({
        name: "Type",
        enum: [
          TypeProject.PERSONAL_PROJECT,
          TypeProject.COMPANY_PROJECT,
          TypeProject.FREELANCE,
        ],
      }),
      id_experiance: zString({
        name: "ID Experiance",
        mandatory:false,
      }),
      id_user: zString({
        name: "ID User",
        mandatory,
      }),

      start_at: zDatetime({
        name: "Start At",
        mandatory:false,
      }),
      end_at: zDatetime({
        name: "End At",
        mandatory: false,
      }),
      id_profession: zString({
        name: "ID Profession",
        mandatory,
      }),
      is_show: zBoolean({
        name: "Is Show Project",
        mandatory,
      }),
    })
    ?.strict();

export default projectSchema;
