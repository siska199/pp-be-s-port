import { zEmail, zPhoneNumber, zString } from "@2. validation/reusable-shema";
import z from "zod";

const personalInfoSchema = (mandatory: boolean = true) =>
  z
    .object({
      professional_image: zString({ name: "Professional Image", mandatory }),
      first_name: zString({ name: "First Name", max: 50, mandatory }),
      last_name: zString({ name: "Last Name", max: 50, mandatory }),

      province: zString({ name: "Province", max: 255, mandatory }),
      city: zString({ name: "City", max: 255, mandatory }),
      district: zString({ name: "District", max: 255, mandatory }),
      postal_code: zString({ name: "Postal Code", max: 255, mandatory }),

      phone_number: zPhoneNumber(mandatory),
      email: zEmail(mandatory),
      about_me: zString({ name: "About Me", min: 150, max: 1000, mandatory }),
      bio: zString({ name: "Bio", mandatory }),
      id_profession: zString({ name: "Profession", mandatory }),
      id_user: zString({ name: "User", mandatory }),
    })
    .strict();

export default personalInfoSchema;
