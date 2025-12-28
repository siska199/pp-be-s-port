import { zString } from "../1. validation/reusable-shema";
import { z } from "zod";

const projectResponsiblitySchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
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
