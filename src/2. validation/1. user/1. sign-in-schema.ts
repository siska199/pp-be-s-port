import { zString } from "@2. validation/reusable-shema";
import z from "zod";

const signInSchema = z
  .object({
    email: zString({
      name: "Email",
    }),
    password: zString({
      name: "Password",
    }),
  })
  ?.strict();

export default signInSchema;
