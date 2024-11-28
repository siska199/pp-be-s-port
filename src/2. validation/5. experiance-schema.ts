import { zDate, zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const experianceSchema = (mandatory = true) =>
  z.object({
    id_user: zString({
      name: "ID String",
      mandatory,
    }),
    id_company: zString({
      name: "ID Company",
      mandatory,
    }),
    id_profession: zString({
      name: "ID Profession",
      mandatory,
    }),
    start_at: zDate({
      name: "Start At",
      mandatory,
    }),
    end_at: zString({
      name: "End At",
      mandatory,
    }),
    is_currently_work_here: z.boolean()?.optional(),
    description: zString({
      name: "Description",
      mandatory,
    }),
  });

export default experianceSchema;
