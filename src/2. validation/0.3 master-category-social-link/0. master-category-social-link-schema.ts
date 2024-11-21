import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const masterCategorySocialLinkSchema = z
  .object({
    name: zString({ name: "Name" }),
    image: zString({ name: "Image", max: 2083 }),
    placeholder: zString({ name: "placeholdre" }),
    default_value: zString({ name: "Default Value" }),
  })
  ?.strict();

export default masterCategorySocialLinkSchema;
