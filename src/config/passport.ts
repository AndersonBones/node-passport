import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import dotenv from 'dotenv'
import User from '../models/User'
import { NextFunction, Request, Response } from "express";
dotenv.config();


const NotAuthorized = {status:401, error:"Unauthorized"} // error message 

const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(), // look for the token in the header
    secretOrKey: process.env.SECRET_KEY as string, // secret key

}

passport.use(new JWTStrategy(options, async (payload, done)=>{ // set jwt strategy 

    const user = await User.findOne({_id:payload.id});

    if(user){ // if user exists
        return done(null, user) // success
    }
    return done(NotAuthorized, false) // fail
}))


export const privateAuth = (req:Request, res:Response, next:NextFunction) =>{ // auth middleware

    const token = req.cookies.token; // get token on cookies
    
    if(token){ // if token exists
        req.headers.authorization = 'Bearer '+token; // set token on header

        const authFunction = passport.authenticate('jwt', (err, user)=>{ // using jwt authenticate
            if(user){
                req.user = user 
                next(); // success authenticate
            } else{
                next(NotAuthorized) // fail authenticate
            }
        })
    
        authFunction(req, res, next)
    } else{
        next(NotAuthorized) // fail authenticate
    }

    
}
export default passport