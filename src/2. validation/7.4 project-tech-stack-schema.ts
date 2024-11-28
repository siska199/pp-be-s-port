import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

export const projectTechStackSchema = (mandatory = false) =>
  z
    .object({
      id_project: zString({
        name: "ID Project",
        mandatory,
      }),
      id_skill_user: zString({
        name: "ID Skill User",
        mandatory,
      }),
    })
    ?.strict();

export default projectTechStackSchema;
