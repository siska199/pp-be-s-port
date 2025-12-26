import { zEmail, zPhoneNumber, zString } from "@1. validation/reusable-shema";
import z from "zod";

const keyMetricSchema = (mandatory: boolean = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      key: zString({ name: "Key", max: 100, mandatory }),
      value: zString({ name: "Value", max: 100, mandatory }),
    })
    .strict();

export default keyMetricSchema;
