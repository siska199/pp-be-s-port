import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const projectRelatedImageSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
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

export default projectRelatedImageSchema;
