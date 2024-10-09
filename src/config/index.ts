import dotenv from 'dotenv'

dotenv.config()


const CONFIG =  {
    SERVER_PORT : process.env.SERVER_PORT as string,
    CLIENT_BASE_URL : process.env.CLIENT_BASE_URL as string,
    SECRET_KEY : process.env.SECRET_KEY as string
}

export default CONFIG