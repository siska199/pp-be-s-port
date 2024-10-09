import express, { Request, Response } from 'express';
export default (router : express.Router)=>{
    router.get('/skill-project', (req:Request, res:Response)=>{
        console.log("res: ", res)
        console.log('req: ', req)
    })
}