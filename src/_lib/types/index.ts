import { User } from "@prisma/client";
import { Request } from "express";

export type Tsort_dir = "desc" | "asc";

export type TQueryParamsPaginationList<TKeysort_by> = {
  current_page: number;
  total_items: number;
  sort_by: TKeysort_by;
  sort_dir: Tsort_dir;
  search?: string;
};

export interface TGeneralObject {
  [key: string]: any;
}

export interface TRequestAuthRoute extends Request {
  user?: User;
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
