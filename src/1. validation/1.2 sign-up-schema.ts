import { zEmail, zPassword, zString } from "@1. validation/reusable-shema";
import z from "zod";

const signUpSchema = z
  .object({
    first_name: zString({ name: "First Name" }),
    last_name: zString({ name: "Last Name" }),
    email: zEmail(),
    password: zPassword(),
    id_profession: zString({ name: "ID Profession" }),
    username: zString({ name: "Username" }),
  })
  ?.strict();

export default signUpSchema;
