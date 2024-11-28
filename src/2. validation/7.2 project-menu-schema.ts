import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const projectMenuSchema = (mandatory = true) =>
  z
    .object({
      name: zString({
        name: "Name",
        mandatory,
      }),
      description: zString({
        name: "Description",
        mandatory,
      }),
      main_image: zString({
        name: "Main Image",
        mandatory,
      }),
      id_project: zString({
        name: "ID Project",
        mandatory,
      }),
    })
    .strict();

export default projectMenuSchema;
