import { zStringRequired } from "@validation/reusable-shema";
import z from "zod";

const loginSchema = z.object({
  email: zStringRequired({
    name: "Email",
  }),
  password: zStringRequired({
    name: "Password",
  }),
});

export default loginSchema;
