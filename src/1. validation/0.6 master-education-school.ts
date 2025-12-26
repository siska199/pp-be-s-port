import { zArray, zString } from "@1. validation/reusable-shema";
import { z } from "zod";

const masterEducationSchoolSchema = (mandatory = true) =>
  z.object({
    id: zString({ name: "ID", mandatory: !mandatory }),
    name: zString({
      name: "Name",
      mandatory,
    }),
    image: zString({
      name: "Image",
      mandatory,
    }),
    id_levels: zArray({
      name: "IDs level",
      mandatory,
    }),
  });

export default masterEducationSchoolSchema;
