import { zString } from "@validation/reusable-shema";
import z from "zod";

const loginSchema = z.object({
  email: zString({
    name: "Email",
  }),
  password: zString({
    name: "Password",
  }),
});

export default loginSchema;
