import {
  zEmail,
  zLink,
  zPassword,
  zPhoneNumber,
  zString,
} from "@4. validation/reusable-shema";
import { z } from "zod";

const userSchema = (mandatory: boolean = true) =>
  z
    .object({
      first_name: zString({ name: "first Name", mandatory }),
      last_name: zString({ name: "Last Name" }),
      email: zEmail(),
      password: zPassword(),
      phone_number: zPhoneNumber(mandatory),
      images: zLink({ mandatory: false }),
      id_profession: zString({ name: "ID Profession" }),
    })
    .strict();

export default userSchema;
