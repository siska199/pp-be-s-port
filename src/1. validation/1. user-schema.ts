import { z } from "zod";
import { zPhoneNumber, zString } from "../1. validation/reusable-shema";

const userSchema = (mandatory = true) =>
  z
    .object({
      id: zString({ name: "ID", mandatory: !mandatory }),
      first_name: zString({ name: "First Name", mandatory }),
      last_name: zString({ name: "Last Name", mandatory }),
      username: zString({ name: "Username", mandatory }),
      email: zString({
        name: "Email",
        mandatory,
      }),
      password: zString({
        name: "Password",
        mandatory,
      }),
      phone_number: zPhoneNumber({
        name: "PhoneNumber",
        mandatory: false,
      }),
      image: zString({
        name: "Image",
        mandatory: false,
      }),
      id_profession: zString({
        name: "ID Profession",
        mandatory,
      }),
    })
    .strict();

export default userSchema;
