import { zEnum, zNumber, zString } from "@2. validation/reusable-shema";
import { Level } from "@prisma/client";
import zod from "zod";

const skillUserSchema = (mandatory: boolean = true) =>
  zod
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      id_skill: zString({
        name: "Skill",
        mandatory,
      }),
      year_of_experiance: zNumber({
        name: "Year Of Experiance",
        mandatory,
      }),
      level: zEnum({
        name: "Level",
        enum: [Level.BEGINNER, Level.INTERMEDIET, Level.ADVANCE],
        mandatory,
      }),
      id_user: zString({
        name: "ID User",
        mandatory,
      }),
    })
    ?.strict();

export default skillUserSchema;
