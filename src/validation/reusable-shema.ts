import validation, { messageError } from "@validation";
import z, { ZodOptional, ZodString } from "zod";

export const zString = <TMandatory extends boolean = true>(params: {
  name: string;
  min?: number;
  max?: number;
  mandatory?: TMandatory;
}): TMandatory extends true ? ZodString : ZodOptional<ZodString> => {
  const { name, max = 255, min = 1, mandatory = true } = params;

  let stringSchema: ZodString | ZodOptional<ZodString> = z.string().max(max, {
    message: messageError.maxCharacter(name, max),
  });

  if (mandatory) {
    stringSchema = stringSchema
      .nonempty({
        message: messageError.required(name),
      })
      .min(min, {
        message: messageError.minCharacter(name, min),
      });
  } else {
    stringSchema = stringSchema.optional();
  }

  return stringSchema as TMandatory extends true
    ? ZodString
    : ZodOptional<ZodString>;
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

export const zEnum = <TEnum extends [string, ...string[]]>(params: {
  name: string;
  enum: TEnum;
  mandatory?: boolean;
}): z.ZodEnum<TEnum> | z.ZodOptional<z.ZodEnum<TEnum>> => {
  const { enum: enumValues, mandatory, name } = params;
  const enumSchema = z.enum(enumValues, {
    message: messageError.required(name),
  });

  return mandatory ? enumSchema : enumSchema.optional();
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
