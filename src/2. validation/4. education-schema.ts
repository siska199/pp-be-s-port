import { zDate, zString } from "@2. validation/reusable-shema";
import { z } from "zod";

const educationSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      id_user: zString({
        name: "ID User",
        mandatory,
      }),
      id_level: zString({
        name: "ID Level",
        mandatory,
      }),
      id_major: zString({
        name: "ID Major",
        mandatory,
      }),
      id_school: zString({
        name: "ID School",
        mandatory,
      }),
      gpa: zString({
        name: "GPA",
        mandatory,
      }),
      description: zString({
        name: "Description",
        mandatory,
        max: 5000,
      }),
      start_at: zDate({
        name: "Start At",
      }),
      end_at: zDate({
        name: "End At",
      }),
    })
    ?.strict();

export default educationSchema;
