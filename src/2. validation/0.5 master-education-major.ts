import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterEducationMajorSchema = (mandatory = true) =>
  z
    .object({
      name: zString({ name: "Name", mandatory }),
      id_levels: zString({
        name: "ID Level",
        mandatory,
      }),
    })
    ?.strict();

export default masterEducationMajorSchema;
