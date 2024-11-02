import {
    zDate,
    zEmail,
    zLink,
    zPassword,
    zPhoneNumber,
    zString,
} from "@_lib/validation/reusable-shema";
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
      is_verified: z.boolean()?.optional(),
      verified_token: zString({ name: "Verified Token", mandatory: false }),
      expired_verified_token: zDate({ name: "Expired Verified Token" }),
      id_profession: zString({ name: "ID Profession" }),
    })
    .strict();

export default userSchema;
