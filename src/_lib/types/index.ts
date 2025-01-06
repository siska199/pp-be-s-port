import { User } from "@prisma/client";
import { Request } from "express";

export type TSort_dir = "desc" | "asc";

export type TQueryParamsPaginationList<TKeysort_by> = {
  page_no?: number;
  items_perpage?: number;
  sort_by?: TKeysort_by;
  sort_dir?: TSort_dir;
  keyword?: string;
};

export interface TGeneralObject {
  [key: string]: any;
}

export interface TRequestAuthRoute extends Request {
  user?: User | null;
}

export interface TOption {
  name: string;
  code: string;
}

export enum TTypeFile {
  JPG = "jpg",
  JPEG = "jpeg",
  PNG = "png",
  GIF = "gif",
  BMP = "bmp",
  WEBP = "webp",
  SVG = "svg",

  DOC = "doc",
  DOCX = "docx",
  PDF = "pdf",
  TXT = "txt",
  XLS = "xls",
  XLSX = "xlsx",
  CSV = "csv",
}
