import { User } from "@prisma/client";
import { Request } from "express";

export interface TGeneralObject {
  [key: string]: any;
}

export interface TRequestAuthRoute extends Request{
  user : User
}
