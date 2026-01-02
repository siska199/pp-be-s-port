import validation, { messageError } from "../1. validation";
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

export const zNumber = (params: {
  name: string;
  min?: number;
  max?: number;
  mandatory?: boolean;
}): z.ZodNumber | z.ZodOptional<z.ZodNumber> => {
  const { name, max = 255, min = 1, mandatory = true } = params;
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

interface TParamsZPhoneNumber {
  name: string;
  mandatory: boolean;
}
export const zPhoneNumber = (params: TParamsZPhoneNumber) => {
  const { name, mandatory = true } = params;
  const phoneSchema = z
    .string()
    .max(15, { message: `${name} must not exceed 15 characters` })
    .refine((val) => /^08\d{8,13}$/.test(val), {
      message: `${name} should be in 08XXXXXXXXXX format`,
    });

  return mandatory ? phoneSchema : phoneSchema.optional(); // Return optional if not mandatory
};

export const zLink = (params: { mandatory?: boolean }) => {
  const { mandatory } = params;
  const linkSchema = zString({ name: "Link", max: 2083 })?.url({
    message: messageError.url,
  });
  return mandatory ? linkSchema : linkSchema?.optional();
};

export const zDate = (params: { name: string; mandatory?: boolean }) => {
  const { name, mandatory = true } = params;
  const dateSchema = z.coerce.date({
    message: `${name} is Invalid`,
  });

  return mandatory ? dateSchema : dateSchema.optional();
};

export const zDatetime = (params: { name: string; mandatory?: boolean }) => {
  const { name, mandatory = true } = params;
  const dateSchema = z.string().datetime();
  return mandatory
    ? dateSchema.nonempty(messageError.required(name))
    : dateSchema.optional();
};

export const zArray = (params: { name: string; mandatory?: boolean }) => {
  const { name, mandatory = true } = params;
  const dateSchema = z.string().array();
  return mandatory
    ? dateSchema.nonempty(messageError.required(name))
    : dateSchema.optional();
};

export const zBoolean = (params: {
  name: string;
  mandatory?: boolean;
}) => {
  const { name, mandatory = true } = params;

  const booleanSchema = z.boolean({
    required_error: messageError.required(name),
    invalid_type_error: `${name} must be a boolean`,
  });

  return mandatory ? booleanSchema : booleanSchema.optional();
};