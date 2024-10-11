import { zEmail, zPassword, zString } from "@validation/reusable-shema";
import z from "zod";

const registerSchema = z.object({
  first_name: zString({ name: "first Name" }),
  last_name: zString({ name: "Last Name" }),
  email: zEmail(),
  password: zPassword(),
  id_profession: zString({ name: "ID Profession" }),
});

export default registerSchema;
