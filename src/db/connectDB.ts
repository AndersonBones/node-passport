import {connect} from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export const connectDB = async () => {

    try {
        await connect(process.env.MONGO_URL as string)
        console.log('Conectado ao banco de dados')
    } catch (error) {
        console.log(error)
    }
    
}