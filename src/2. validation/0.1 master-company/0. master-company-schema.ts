import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterCompanySchema = (mandatory: boolean = true) =>
  z
    .object({
      name: zString({ name: "Name", mandatory }),
      image: zString({ name: "Image", mandatory }),
    })
    .strict();

export default masterCompanySchema;
