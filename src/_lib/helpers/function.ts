import { CustomError } from "@_lib/middleware/error-handler";
import { TGeneralObject } from "@_lib/types";
import { z } from "zod";

export const generateTimeExpired = (day: number = 1) => {
  return new Date(Date.now() + 24 * 60 * 60 * 1000 * day);
};
export const getUniqueListBy = (arr: TGeneralObject[], key: string) => {
  return [...new Map(arr?.map((item) => [item[key], item])).values()];
};

export const removeKeyWithUndifienedValue = <TData extends object>(
  obj: TData
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== undefined)
  );
};

interface TParams<TObject extends object> {
  object: TObject;
  keys: (keyof TObject)[];
}
export const filterKeysObject = <TObject extends object>(
  params: TParams<TObject>
) => {
  const { object, keys } = params;

  keys?.forEach((key) => {
    delete object[key];
  });

  return object;
};

export const validationParse = async (params: {
  schema: z.ZodObject<any, any> | z.ZodEffects<any, any>;
  data: TGeneralObject;
}) => {
  const { schema, data } = params;
  const validation = await schema.safeParseAsync(data);
  if (!validation.success) {
    const issues = validation.error.issues;
    const fieldErrors = validation?.error?.flatten()?.fieldErrors;

    const errorsValidation: TGeneralObject = {};

    issues.forEach((issue) => {
      if (issue.code === "unrecognized_keys") {
        issue.keys.forEach((key) => {
          errorsValidation[key] = issue.message;
        });
      } else {
        errorsValidation[issue.path.join(".")] = issue.message;
      }
    });

    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        errorsValidation[field] = messages?.[0];
      });
    }

    throw new CustomError(errorsValidation);
  }
};

export const convertToISOString = (date: Date) => {
  const date_ = new Date(date);

  return date_?.toISOString();
};

export const trimObject = <T extends object>(obj: T): T => {
  const result: any = Array.isArray(obj) ? [] : {};

  Object.entries(obj)?.map(([key, value]) => {
    if (typeof value === "string") {
      result[key] = value.trim();
    } else if (typeof value === "object" && value !== null) {
      result[key] = trimObject(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};

export const deepCopy = <T extends object>(input: T): T => {
  if (input === null || typeof input !== "object") return input;
  if (input instanceof Date) return new Date(input.getTime()) as T;
  if (Array.isArray(input))
    return input.map((item) => deepCopy(item)) as unknown as T;

  const result: any = {};
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = (input as any)[key];
      result[key] = deepCopy(value);
    }
  }

  return result;
};
