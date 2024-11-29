import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterSkillSchema = (mandatory = true) =>
  z.object({
    id: zString({ name: "ID", mandatory: !mandatory }),
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

export default masterSkillSchema;
