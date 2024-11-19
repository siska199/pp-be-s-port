import { z } from "zod";
import { zString } from "../reusable-shema";

const masterEducationLevelSchema = z
  .object({
    name: zString({ name: "Name" }),
  })
  ?.strict();

export default masterEducationLevelSchema;
