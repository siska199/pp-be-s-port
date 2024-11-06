import { TGeneralObject } from "@_lib/types";

export const generateTimeExpired = (day: number = 1) => {
  return new Date(Date.now() + 24 * 60 * 60 * 1000 * day);
};
export const getUniqueListBy = (arr: TGeneralObject[], key: string) => {
  return [...new Map(arr?.map((item) => [item[key], item])).values()];
};
