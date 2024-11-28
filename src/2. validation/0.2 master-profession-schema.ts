import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterProfessionSchema = (mandatory = true) =>
  z
    .object({
      name: zString({ name: "Name", mandatory }),
    })
    ?.strict();

export default masterProfessionSchema;
