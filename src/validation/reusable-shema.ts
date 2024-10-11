import validation, { messageError } from "@validation";
import z, { ZodString } from "zod";

interface TParamsString {
  name: string;
  min?: number;
  max?: number;
  mandatory?: boolean;
}

export const zString = ({
  name,
  max = 255,
  min = 1,
  mandatory = true,
}: TParamsString): ZodString | z.ZodOptional<ZodString> => {
  const stringSchema = z.string().max(max, {
    message: messageError.maxCharacter(name, max),
  });

  if (mandatory) {
    return stringSchema
      .nonempty({ message: messageError.required(name) })
      .min(min, {
        message: messageError.minCharacter(name, min),
      });
  }

  return stringSchema.optional();
};

interface TParamsNumber {
  name: string;
  min?: number;
  max?: number;
  mandatory?: boolean;
}
export const zNumber = ({
  name,
  max = 255,
  min = 1,
  mandatory = true,
}: TParamsNumber): z.ZodNumber | z.ZodOptional<z.ZodNumber> => {
  const numberSchema = z.number().max(max, {
    message: messageError.maxNumber(name, max),
  });

  if (mandatory) {
    return numberSchema.min(min, {
      message: messageError.minNumber(name, min),
    });
  }

  return numberSchema.optional(); // Return an optional number
};

export const zPassword = (mandatory = true) => {
  return zString({ name: "Password", mandatory }).refine(
    (val) => validation.password.regex.test(val as string),
    {
      message: validation.password.message,
    }
  );
};

export const zEmail = (mandatory = true) => {
  return zString({ name: "Email", mandatory }).refine(
    (val) => (mandatory ? validation.email.regex.test(val as string) : true),
    {
      message: validation.email.message,
    }
  );
};

export const zPhoneNumber = (mandatory = true) => {
  const phoneSchema = z
    .string()
    .max(15, { message: "Phone number must not exceed 15 characters" })
    .refine((val) => /^08\d{8,13}$/.test(val), {
      message: "Phone Number should be in 08XXXXXXXXXX format",
    });

  return mandatory ? phoneSchema : phoneSchema.optional(); // Return optional if not mandatory
};
