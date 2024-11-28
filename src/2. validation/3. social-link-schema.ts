import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const socialLinkSchema = (mandatory = true) =>
  z.object({
    url: zString({
      name: "Url",
      mandatory,
    }),
    id_category: zString({
      name: "ID Category",
      mandatory,
    }),
    id_user: zString({
      name: "ID User",
      mandatory,
    }),
  });

export default socialLinkSchema;
