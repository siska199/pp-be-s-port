import { zString } from "../1. validation/reusable-shema";
import { z } from "zod";

const masterProfessionSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      name: zString({ name: "Name", mandatory }),
    })
    ?.strict();

export default masterProfessionSchema;
