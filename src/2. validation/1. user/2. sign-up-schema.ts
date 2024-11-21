import { zEmail, zPassword, zString } from "@2. validation/reusable-shema";
import z from "zod";

const signUpSchema = z
  .object({
    first_name: zString({ name: "first Name" }),
    last_name: zString({ name: "Last Name" }),
    email: zEmail(),
    password: zPassword(),
    id_profession: zString({ name: "ID Profession" }),
  })
  ?.strict();

export default signUpSchema;
