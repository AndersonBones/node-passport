import { Request, Response } from "express";
import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req:Request, res:Response) => {
    
    if(!req.body.name && !req.body.email && !req.body.password){
        res.status(400).json({ error: 'E-mail e/ou senha não enviados.' })
    }

    const {name, email, password} = req.body;

    let hasUser = await User.findOne({email});

    if(!hasUser){
        let newUser = await new User({name, email, password:bcrypt.hashSync(password, 12)}).save()
        const token = jwt.sign({id:newUser._id}, process.env.SECRET_KEY as string)
        res.cookie('token', token, {httpOnly:true}).status(201).redirect('/list')
    }else{
        res.status(403).json({error:"Esse email já está em uso"})

    }    
}

export const login = async (req:Request, res:Response) => {
    
    if(req.body.email && req.body.password){

        const { email, password} = req.body;
        let user:any = await User.findOne({email});

        if(user){
            const match = bcrypt.compareSync(password, user.password)

            if(match){
                const token = jwt.sign({id:user._id}, process.env.SECRET_KEY as string)
                
                res.cookie('token', token, {httpOnly:true}).status(200).render('list')
                
            }
            else{
                res.status(404).json({error:"Email ou Senha inválidos"})
            }
        } else{
            res.status(404).json({error:"Email ou Senha inválidos"})
        }
    }
    else{
        res.status(400).json({error:'E-mail e/ou senha não enviados.'})

    }

    
    
}


