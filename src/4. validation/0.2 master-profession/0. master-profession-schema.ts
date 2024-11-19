import { zString } from "@4. validation/reusable-shema";
import { z } from "zod";

const masterProfessionSchema = z
  .object({
    name: zString({ name: "Name" }),
  })
  ?.strict();

export default masterProfessionSchema;
