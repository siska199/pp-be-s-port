import { messageError } from "@validation";
import z from "zod";

interface TParamsStringRequired {
  name: string;
  min?: number;
  max?: number;
}
export const zStringRequired = (params: TParamsStringRequired): z.ZodString => {
  const { name, max = 255, min = 1 } = params;
  return z
    .string()
    .nonempty({ message: messageError.required(name) })
    .min(min, {
      message: messageError.minCharacter(name, min),
    })
    .max(max, {
      message: messageError.maxCharacter(name, max),
    });
};

export const zNumberRequired = (params: TParamsStringRequired): z.ZodNumber => {
  const { name, max = 255, min = 1 } = params;
  return z
    .number()
    .min(min, {
      message: messageError.minNumber(name, min),
    })
    .max(max, {
      message: messageError.maxNumber(name, max),
    });
};
