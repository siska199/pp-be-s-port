import { zString } from "../1. validation/reusable-shema";
import { z } from "zod";

const projectLinkSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      url: zString({
        name: "URL",
        mandatory,
      }),
      label: zString({
        name: "Label",
        mandatory,
        max: 50,
      }),
      id_project: zString({
        name: "ID Project",
        mandatory,
      }),
    })
    ?.strict();

export default projectLinkSchema;
