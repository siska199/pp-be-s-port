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
  Object.keys((key: keyof TData) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
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
  schema: z.ZodObject<any, any>;
  data: TGeneralObject;
}) => {
  const { schema, data } = params;
  const validation = await schema.safeParseAsync(data);
  if (!validation.success) {
    const errors = validation?.error?.flatten()?.fieldErrors;
    console.log("errors: ", errors);
    throw new CustomError(errors);
  }
};
