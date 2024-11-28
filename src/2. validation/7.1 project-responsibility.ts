import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const projectResponsiblitySchema = (mandatory = true) =>
  z
    .object({
      description: zString({
        name: "Description",
        mandatory,
      }),
      id_project: zString({
        name: "ID Project",
        mandatory,
      }),
    })
    ?.strict();

export default projectResponsiblitySchema;
