import { zString } from "@2. validation/reusable-shema";
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
