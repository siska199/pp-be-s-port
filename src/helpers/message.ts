import { Response } from "express";

export const successMessage = (params:{res:Response,code?:200|201,data?:any; message:string })=>{
    const {res,code=200, data, message } = params
    return res.status(code).send({
        status:true, 
        data,
        message
    })
}

export const errorMessage = (params:{res:Response;code?:500|400|40;message:string})=>{
    const {res,code=500, message } = params
    return res.status(code).send({
        status:false,
        message
    })
}