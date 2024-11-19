import { User } from "@prisma/client";
import { Request } from "express";

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
