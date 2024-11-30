import { zString } from "@1. validation/reusable-shema";
import { z } from "zod";

const masterCategorySocialLinkSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      name: zString({ name: "Name", mandatory }),
      image: zString({ name: "Image", max: 2083, mandatory }),
      placeholder: zString({ name: "placeholdre", mandatory }),
      default_value: zString({ name: "Default Value", mandatory }),
    })
    ?.strict();

export default masterCategorySocialLinkSchema;
