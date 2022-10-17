import { Request, Response } from "express";
import * as UserService from '../services/UserService'


export const register = async (req:Request, res:Response) => {
    
    if(req.body.name && req.body.email && req.body.password){
        let newUser = await UserService.creatUser(req.body.name, req.body.email, req.body.password);

        if(newUser instanceof Error){
            res.status(401).json({error:newUser.message})
        } else{
            const token = await UserService.GenToken({id:newUser._id}, process.env.SECRET_KEY as string)
            res.cookie('token', token, {httpOnly:true}).status(201).redirect('/list')
        }
    }else{
        res.status(400).json({ error: 'E-mail e/ou senha não enviados.' })
    } 
}

export const login = async (req:Request, res:Response) => {
    
    if(req.body.email && req.body.password){

        let user = await UserService.findByEmail(req.body.email);

        if(user && await UserService.matchPassword(req.body.password, user.password as string)){

            const token = await UserService.GenToken({id:user._id}, process.env.SECRET_KEY as string)
            res.cookie('token', token, {httpOnly:true}).status(200).render('list')
                
        } else{
            res.status(404).json({error:"Email ou Senha inválidos"})
        }
    }
    else{
        res.status(400).json({error:'E-mail e/ou senha não enviados.'})
    }

}


