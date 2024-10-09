import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(500).send({
        status:false,
        message:error.message
    });
};

export default errorHandler;