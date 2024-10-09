import express from 'express'
import './config/index'
import CONFIG from './config/index'
import cors from 'cors'
import routes from './routes'
const app = express()

const main = ()=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors({
        credentials:true,
        origin : [CONFIG.CLIENT_BASE_URL]
    }))
    app.use("api/v1",routes())
    app.listen(CONFIG.SERVER_PORT, ()=>{
        console.log(`Listen to port: ${CONFIG.SERVER_PORT}`)
    })

}


main()


