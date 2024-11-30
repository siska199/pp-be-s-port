import { zString } from "@1. validation/reusable-shema";
import { z } from "zod";

const socialLinkSchema = (mandatory = true) =>
  z.object({
    id: zString({ name: "ID", mandatory: !mandatory }),
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
