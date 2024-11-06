import { zString } from "@_lib/validation/reusable-shema";
import { z } from "zod";

const masterCompanySchema = (mandatory: boolean = true) =>
  z
    .object({
      name: zString({ name: "Name", mandatory }),
    })
    .strict();

export default masterCompanySchema;
