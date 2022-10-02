import express,{ErrorRequestHandler, Request, Response} from 'express'
import dotenv from 'dotenv'
import path from 'path';
import {connectDB} from './db/connectDB'
import Api from './routes/api'
import cookieParser from 'cookie-parser'
import passport from 'passport'


dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

connectDB();
app.use(cookieParser())

app.use(passport.initialize())
app.use(Api)

const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
    if(err.status){
        res.status(err.status)
    }else{
        res.status(400)
    }

    //there is no custom error

    if(err.message){
        res.json({error:err.message})
    }else{
        res.json({error:'Houve algum erro'})
    }
}

app.use(errorHandler);

app.use((req:Request, res:Response)=>{
    res.status(404).json({error:"Página não encontrada"})
})

app.listen(process.env.PORT || 8080)
