import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterCategorySkillSchema = (mandatory = true) =>
  z.object({
    name: zString({
      name: "Name",
      mandatory,
    }),
    image: zString({
      name: "Image",
      mandatory,
    }),
    color: zString({
      name: "Color",
      mandatory,
    }),
    id_category: zString({
      name: "ID Category",
      mandatory,
    }),
  });

export default masterCategorySkillSchema;
