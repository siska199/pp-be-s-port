import { zString } from "../1. validation/reusable-shema";
import { z } from "zod";

const masterEducationMajorSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      name: zString({ name: "Name", mandatory }),
      id_levels: zString({
        name: "ID Level",
        mandatory,
      }),
    })
    ?.strict();

export default masterEducationMajorSchema;
