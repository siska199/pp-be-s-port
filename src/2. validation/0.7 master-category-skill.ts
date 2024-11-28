import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterCategorySkillSchema = (mandatory = true) =>
  z.object({
    name: zString({
      name: "Name",
      mandatory,
    }),
  });

export default masterCategorySkillSchema;
