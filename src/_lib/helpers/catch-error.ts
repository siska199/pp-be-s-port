import { NextFunction, Request, Response } from "express";

type TAsyncController<TReq extends Request = Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchErrors =
  <TReq extends Request = Request>(
    controller: TAsyncController<TReq>
  ): TAsyncController<TReq> =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;
