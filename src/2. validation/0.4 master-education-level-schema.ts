import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterEducationLevelSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      name: zString({ name: "Name", mandatory }),
    })
    ?.strict();

export default masterEducationLevelSchema;
