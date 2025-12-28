import { zString } from "../1. validation/reusable-shema";
import z from "zod";

const signInSchema = z
  .object({
    username: zString({
      name: "Username",
    }),
    password: zString({
      name: "Password",
    }),
  })
  ?.strict();

export default signInSchema;
