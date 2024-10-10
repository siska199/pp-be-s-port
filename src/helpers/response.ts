import { Response } from "express";

interface TResponse<TCode = 200 | 201> {
  res: Response;
  code?: TCode;
  data?: any;
  message: string;
}
export const successResponse = (params: TResponse<200 | 201>) => {
  const { res, code = 200, data, message } = params;
  return res.status(code).send({
    status: true,
    data,
    message,
  });
};

export const errorResponse = (params: TResponse<500 | 400 | 404>) => {
  const { res, code = 500, message } = params;
  return res.status(code).send({
    status: false,
    message,
  });
};
