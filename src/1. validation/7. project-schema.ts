import { messageError } from "../1. validation";
import { zArray, zDatetime, zEnum, zString } from "../1. validation/reusable-shema";
import { CategoryProject, TypeProject } from "@prisma/client";
import { z } from "zod";

const projectSchema = (mandatory = true) =>
  z
    ?.object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      name: zString({
        name: "Name",
        mandatory,
      }),
      thumbnail_image: zString({
        name: "Thumbnail Image",
        mandatory,
      }),
      description: zString({
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
        mandatory,
      }),
      id_user: zString({
        name: "ID User",
        mandatory,
      }),
      id_skill_users: zArray({
        name: "Tech Stack",
        mandatory,
      }),
      start_at: zDatetime({
        name: "Start At",
        mandatory,
      }),
      end_at: zDatetime({
        name: "End At",
        mandatory: false,
      }),
      id_profession: zString({
        name: "ID Profession",
        mandatory,
      }),
    })
    ?.strict();

export default projectSchema;
