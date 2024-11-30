import { zDate, zDatetime, zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const experianceSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
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
      start_at: zDatetime({
        name: "Start At",
        mandatory,
      }),
      end_at: zDatetime({
        name: "End At",
        mandatory: false,
      }),
      is_currently_work_here: z.boolean()?.optional(),
      description: zString({
        name: "Description",
        mandatory,
      }),
    })
    .superRefine((data, ctx) => {
      if (!data.is_currently_work_here && !data.end_at) {
        ctx.addIssue({
          code: "custom",
          message: "End At is Required----",
          path: ["end_at"],
        });
      }
    });

export default experianceSchema;
