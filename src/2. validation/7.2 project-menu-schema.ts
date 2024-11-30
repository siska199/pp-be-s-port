import { zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const projectMenuSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
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
      features: zString({
        name: "Features",
        mandatory,
      }),
      id_project: zString({
        name: "ID Project",
        mandatory,
      }),
    })
    .strict();

export default projectMenuSchema;
