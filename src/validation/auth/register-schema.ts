import validation, { messageError } from "@validation";
import { zStringRequired } from "@validation/reusable-shema";
import z from "zod";

const registerSchema = z.object({
  first_name: zStringRequired({ name: "first Name" }),
  last_name: zStringRequired({ name: "Last Name" }),
  email: zStringRequired({ name: "Email" }).refine((val) =>
    validation.email.regex.test(val)
  ),
  password: zStringRequired({ name: "Password" }).refine(
    (val) => validation.password.regex.test(val),
    {
      message: validation.password.message,
    }
  ),
  id_profession: zStringRequired({ name: "ID Profession" }),
});

export default registerSchema;
