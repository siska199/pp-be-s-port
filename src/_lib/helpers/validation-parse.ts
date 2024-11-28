import { CustomError } from "@_lib/middleware/error-handler";
import { TGeneralObject } from "@_lib/types";
import { z } from "zod";

export default async (params: {
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
