import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

export const projectRelatedImage = (mandatory = true) =>
  z
    .object({
      image: zString({
        name: "Image",
        mandatory,
      }),
      id_menu_project: zString({
        name: "id_menu_project",
        mandatory,
      }),
    })
    ?.strict();
