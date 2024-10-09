import express from 'express';
import skillProjectRoute from './skill/skill-project-route';
export default ()=>{
    const router = express.Router()
    skillProjectRoute(router)
    return router
}