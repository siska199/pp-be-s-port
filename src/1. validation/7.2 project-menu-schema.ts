import { zArray, zString } from "../1. validation/reusable-shema";
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
      // related_images: zArray({
      //   name: "Related Images",
      //   mandatory,
      // }),
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
