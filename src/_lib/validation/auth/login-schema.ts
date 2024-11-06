import { zString } from "@_lib/validation/reusable-shema";
import z from "zod";

const loginSchema = z
  .object({
    email: zString({
      name: "Email",
    }),
    password: zString({
      name: "Password",
    }),
  })
  ?.strict();

export default loginSchema;
